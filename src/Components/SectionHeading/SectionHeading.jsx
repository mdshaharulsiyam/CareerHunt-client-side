import './SectionHeading.css'
const SectionHeading = ({ topheadin, heading }) => {
    return (
        <div>
            <h3 className="text-red-600 sectionheading ml-4 font-bold my-2">{topheadin}</h3>
            <p className='text-4xl mb-4'>{heading}</p>
        </div>
    )
}

export default SectionHeading
