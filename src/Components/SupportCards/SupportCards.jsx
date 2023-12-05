const SupportCards = ({heading,peragraph,logo}) => {
  return (
    <div className="text-center">
        <img className="bg-black mx-auto block rounded-full p-2 w-16 h-16" src={logo} alt="" />
      <h3 className="text-xl font-semibold py-1">{heading}</h3>
      <p className="text-sm">{peragraph}</p>
    </div>
  )
}

export default SupportCards
