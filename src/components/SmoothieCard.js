const SmoothieCard = ({ smoothie }) => {
  return (
    <div className="smoothie-card">
        <h1>SN : {smoothie.id}</h1>
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className="rating">{smoothie.rating}</div>
      
    </div>
  )
}

export default SmoothieCard
