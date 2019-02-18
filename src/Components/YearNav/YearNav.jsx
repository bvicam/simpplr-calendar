import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
    showYearNav: PropTypes.bool,
    year: PropTypes.string,
    yearInput: PropTypes.string,
    onKeyUpYear: PropTypes.func.isRequired,
    onYearChange: PropTypes.func,
    showYearEditor:PropTypes.func
}

const Year = (props) => {
    const { showYearNav, year, onKeyUpYear, onYearChange, showYearEditor } = props;
    return (
        showYearNav ?
            <input
                defaultValue={year}
                className="editor-year"
                ref={(yearInput) => { yearInput = yearInput }}
                onKeyUp={(e) => onKeyUpYear(e)}
                onChange={(e) => onYearChange(e)}
                type="number"
                placeholder="year" />
            :
            <span
                className="label-year"
                onClick={(e) => { showYearEditor() }}>
                {year}
            </span>
    );
}

Year.propTypes = propTypes

export default Year;

