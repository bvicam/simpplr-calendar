import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
    list: PropTypes.array.isRequired,
    onSelectChange: PropTypes.func.isRequired
}

function MonthNameList(props) {
    const { list, onSelectChange } = props;
    const popup = list.map((data) => {
        return (
            <div key={data}>
                <a onClick={(e) => { onSelectChange(e, data) }}>
                    {data}
                </a>
            </div>
        );
    })
    return (
        <div className="month-popup">
            {popup}
        </div>
    );
}

MonthNameList.propTypes = propTypes

export default MonthNameList;
