export default function generatePoint (r1, r2) {
    const min = r1 * r1
    const max = r2 * r2
    let x = Math.random() * r2
    let y = Math.random() * r2
    if (x*x + y*y > max) {
        let x = Math.random() * r2
        let y = Math.random() * r2
    } else { return }
    generatePoint()
}