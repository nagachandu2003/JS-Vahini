

const DistrictItem = (props) => {
    const {optionDetails} = props
    const {OptionId} = optionDetails
    return (<option>{OptionId}</option>)
}

export default DistrictItem