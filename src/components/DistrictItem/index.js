

const DistrictItem = (props) => {
    const {optionDetails} = props
    const {OptionId} = optionDetails
    return (
    <option value={OptionId}>{OptionId}</option>
)
}

export default DistrictItem