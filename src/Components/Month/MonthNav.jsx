import React from 'react'
import PropTypes from 'prop-types'
import MonthNameList from "./MonthNameList";

const propTypes = {
    monthName: PropTypes.string,
    list: PropTypes.array.isRequired,
    showMonthPopup: PropTypes.bool,
    onChangeMonth: PropTypes.func.isRequired,
    onSelectChange:PropTypes.func.isRequired
}

const MonthNav = (props) => {
    const { onChangeMonth, monthName, list, showMonthPopup, onSelectChange } = props
    return (
        <span className="label-month"
            onClick={(e) => { onChangeMonth(e, monthName) }}>
            {monthName}
            {showMonthPopup && <MonthNameList
                list={list}
                onSelectChange={onSelectChange}
            />
            }

        </span>
    )
}

MonthNav.propTypes = propTypes

export default MonthNav;
