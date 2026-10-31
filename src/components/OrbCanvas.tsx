import { useEffect, useRef } from 'react'

type Point3D = { x: number; y: number; z: number }

/** Lightweight canvas 3D constellation; no WebGL runtime or GPU-heavy framework required. */
export default function OrbCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d', { alpha: true })
    if (!canvas || !context) return
    const ctx = context
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const points: Point3D[] = []
    const total = 190
    const goldenAngle = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < total; i++) {
      const y = 1 - (i / (total - 1)) * 2
      const radius = Math.sqrt(1 - y * y)
      const theta = goldenAngle * i
      points.push({ x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius })
    }

    let width = 0
    let height = 0
    let frame = 0
    let time = 0
    let pointerX = 0
    let pointerY = 0
    let targetX = 0
    let targetY = 0
    let visible = false
    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 1.6)
      width = bounds.width
      height = bounds.height
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    }
    const onPointer = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect()
      targetX = ((event.clientX - bounds.left) / bounds.width - .5) * 1.15
      targetY = ((event.clientY - bounds.top) / bounds.height - .5) * 1.15
    }
    const onLeave = () => { targetX = 0; targetY = 0 }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !frame) frame = requestAnimationFrame(draw)
    }, { threshold: .05 })
    observer.observe(canvas)
    const draw = () => {
      frame = 0
      if (!visible) return
      if (width === 0 || height === 0) resize()
      pointerX += (targetX - pointerX) * .035
      pointerY += (targetY - pointerY) * .035
      if (!reducedMotion) time += .003
      ctx.clearRect(0, 0, width, height)
      const cx = width / 2
      const cy = height / 2 - 5
      const radius = Math.min(width, height) * .285
      const rotation = time + pointerX * .52
      const tilt = pointerY * .48
      const projected = points.map((point, index) => {
        const x1 = point.x * Math.cos(rotation) - point.z * Math.sin(rotation)
        const z1 = point.x * Math.sin(rotation) + point.z * Math.cos(rotation)
        const y2 = point.y * Math.cos(tilt) - z1 * Math.sin(tilt)
        const z2 = point.y * Math.sin(tilt) + z1 * Math.cos(tilt)
        const perspective = 2.5 / (2.5 - z2 * .42)
        return { x: cx + x1 * radius * perspective, y: cy + y2 * radius * perspective, z: z2, alpha: .18 + ((z2 + 1) / 2) * .78, size: .55 + ((z2 + 1) / 2) * 1.4, index }
      })
      const glow = ctx.createRadialGradient(cx, cy, radius * .05, cx, cy, radius * 1.2)
      glow.addColorStop(0, 'rgba(198, 216, 171, .16)')
      glow.addColorStop(.55, 'rgba(160, 180, 140, .06)')
      glow.addColorStop(1, 'rgba(160, 180, 140, 0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 1.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.lineWidth = .65
      for (let i = 0; i < projected.length; i++) {
        const a = projected[i]
        let closest = -1
        let closestDistance = .17
        // A sparse set of local links makes a fine, moving geodesic mesh.
        for (let j = i + 1; j < projected.length; j++) {
          const b = projected[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = (dx * dx + dy * dy) / (radius * radius)
          if (distance < closestDistance) { closestDistance = distance; closest = j }
        }
        if (closest >= 0 && a.z > -.25) {
          const b = projected[closest]
          ctx.strokeStyle = `rgba(208, 225, 183, ${Math.min(a.alpha, b.alpha) * .12})`
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
        }
      }
      projected.forEach(point => {
        ctx.fillStyle = `rgba(224, 237, 204, ${point.alpha})`
        ctx.beginPath(); ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2); ctx.fill()
      })
      if (!reducedMotion) frame = requestAnimationFrame(draw)
    }
    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', onPointer)
    canvas.addEventListener('pointerleave', onLeave)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', onPointer)
      canvas.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <canvas ref={canvasRef} className="orb-canvas" aria-label="Interactive rotating three dimensional constellation" role="img" />
}
