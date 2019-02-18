import React from 'react';
import moment from 'moment';
import Days from '../Day/Days'
import MonthNav from "../Month/MonthNav";
import YearNav from "../YearNav/YearNav";

class Calendar extends React.Component {
	state = {
		dateContext: localStorage.getItem('date') ? moment(localStorage.getItem('date')) : moment(),
		today: moment(),
		showMonthPopup: false,
		showYearPopup: false,
		selectedDay: null
	}

	constructor(props) {
		super(props);
		this.width = props.width || "350px";
		this.style = props.style || {};
		this.style.width = this.width;
		this.yearInput = '';
	}


	weekdays = moment.weekdays(); //["Sunday", "Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday"]
	weekdaysShort = moment.weekdaysShort(); // ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	months = moment.months();

	year = () => {
		return this.state.dateContext.format("Y");
	}
	month = () => {
		return this.state.dateContext.format("MMMM");
	}
	daysInMonth = () => {
		return this.state.dateContext.daysInMonth();
	}
	currentDate = () => {
		console.log("currentDate: ", this.state.dateContext.get("date"));
		return this.state.today.get("date");
	}
	currentDay = () => {
		return this.state.today.format("D");
	}

	firstDayOfMonth = () => {
		let dateContext = this.state.dateContext;
		let firstDay = moment(dateContext).startOf('month').format('d'); // Day of week 0...1..5...6
		return firstDay;
	}

	setMonth = (month) => {
		let monthNo = this.months.indexOf(month);
		let dateContext = Object.assign({}, this.state.dateContext);
		dateContext = moment(dateContext).set("month", monthNo);
		localStorage.setItem('date', dateContext);
		this.setState({
			dateContext: dateContext
		});
	}

	nextMonth = () => {
		let dateContext = Object.assign({}, this.state.dateContext);
		dateContext = moment(dateContext).add(1, "month");
		this.setState({
			dateContext: dateContext,
			selectedDay: null
		});
		this.props.onNextMonth && this.props.onNextMonth();
	}

	prevMonth = () => {
		let dateContext = Object.assign({}, this.state.dateContext);
		dateContext = moment(dateContext).subtract(1, "month");
		this.setState({
			dateContext: dateContext,
			selectedDay: null
		});
		this.props.onPrevMonth && this.props.onPrevMonth();
	}

	onSelectChange = (e, data) => {
		this.setMonth(data);
		this.props.onMonthChange && this.props.onMonthChange();
		this.setState({
			selectedDay: null
		});
	}

	onChangeMonth = (e, month) => {
		this.setState({
			showMonthPopup: !this.state.showMonthPopup
		});
	}

	showYearEditor = () => {
		this.setState({
			showYearNav: true
		});
	}

	setYear = (year) => {
		let dateContext = Object.assign({}, this.state.dateContext);
		dateContext = moment(dateContext).set("year", year);
		localStorage.setItem('date', dateContext);
		this.setState({
			dateContext: dateContext,
		})
	}
	
	onYearChange = (e) => {
		this.setYear(e.target.value);
		this.props.onYearChange && this.props.onYearChange(e, e.target.value);
		this.setState({
			selectedDay: null
		})
	}

	onKeyUpYear = (e) => {
		if (e.which === 13 || e.which === 27) {
			this.setYear(e.target.value);
			this.setState({
				showYearNav: false
			})
		}
	}

	onDayClick = (e, day) => {
		this.setState({
			selectedDay: day
		}, () => {
			console.log("SELECTED DAY: ", this.state.selectedDay);
		});

		this.props.onDayClick && this.props.onDayClick(e, day);
	}

	render() {
		// Map the weekdays i.e Sun, Mon, Tue etc as <td>
		let weekdays = this.weekdaysShort.map((day) => {
			return (
				<td key={day} className="week-day">{day}</td>
			)
		});

		let prevDays = [];
		let cd = parseInt(this.currentDay(), 10);
		cd += parseInt(this.firstDayOfMonth(), 10);
		for (let i = 0; i < this.firstDayOfMonth(); i++) {
			const _date = moment(this.state.dateContext);
			const d = _date.subtract(--cd, 'd').format('D');
			let selectedClass = (d === this.state.selectedDay ? " active " : "");
			prevDays.push(
				<td key={"prevDays" + i} className={"day blank-days " + selectedClass} >
					<span onClick={(e) => { this.onDayClick(e, d) }}>{d}</span>
				</td>
			);
		}

		//check if having current date the enable current day.
		const hasSameDate = this.state.today.format('YMMDD') === this.state.dateContext.format('YMMDD');

		let daysInMonth = [];
		for (let d = 1; d <= this.daysInMonth(); d++) {
			let className = (hasSameDate && d == this.currentDay() ? "day current-day" : "day");
			let selectedClass = (d === this.state.selectedDay ? " active " : "");
			daysInMonth.push(
				<td key={d} className={className + selectedClass} >
					<span onClick={(e) => { this.onDayClick(e, d) }}>{d}</span>
				</td>
			);
		}

		console.log("days: ", daysInMonth);

		var totalSlots = [...prevDays, ...daysInMonth];
		let rows = [];
		let cells = [];

		totalSlots.forEach((row, i) => {
			if ((i % 7) !== 0) {
				cells.push(row);
			} else {
				let insertRow = cells.slice();
				rows.push(insertRow);
				cells = [];
				cells.push(row);
			}
			if (i === totalSlots.length - 1) {
				let insertRow = cells.slice();
				rows.push(insertRow);
			}
		});

		const nextDays = 7 - rows[rows.length - 1].length;
		// next days 
		for (let d = 1; d <= nextDays; d++) {
			let selectedClass = (d.toString() === this.state.selectedDay ? " active " : "");
			rows[rows.length - 1].push(
				<td key={"nextDays" + d} className={"day blank-days " + selectedClass} >
					<span onClick={(e) => { this.onDayClick(e, d.toString()) }}>{d}</span>
				</td>
			);
		}

		return (
			<div style={this.style}>
				<table className="calendar">
					<thead>
						<tr >
							<td colSpan="100%">
								<div className="month">
									<ul>
										<li className="prev" onClick={(e) => { this.prevMonth() }}>&#10094;</li>
										<li className="next" onClick={(e) => { this.nextMonth() }}>&#10095;</li>
										<li>
											<strong>
												<MonthNav
													onChangeMonth={this.onChangeMonth}
													monthName={this.month()}
													list={this.months}
													showMonthPopup={this.state.showMonthPopup}
													onSelectChange={this.onSelectChange}
												/>
											</strong> <br />
											<span style={{ "fontSize": "18px" }}>
												<YearNav
													showYearNav={this.state.showYearNav}
													year={this.year()}
													yearInput={this.yearInput}
													onKeyUpYear={this.onKeyUpYear}
													onYearChange={this.onYearChange}
													showYearEditor={this.showYearEditor}
												/>
											</span>
										</li>
									</ul>
								</div>
							</td>
						</tr>
					</thead>
					<tbody>
						<tr className="weekdays">
							{weekdays}
						</tr>
						<Days
							days={rows}
						/>
					</tbody>
				</table>
			</div>
		);
	}
}

export default Calendar;