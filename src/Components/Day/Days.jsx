import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
    days: PropTypes.array
}

const Day = (props) => {
    return (
        props.days.map((d, i) => {
            return (
                <tr key={i * 100} className="days">
                    {d}
                </tr>
            );
        })
    )
}

Day.propTypes = propTypes

export default Day;
