import React from "react";
import PropTypes from "prop-types";

const Task = props => {
	return (
		<li className="list-group-item d-flex d-flex justify-content-between align-items-center">
			{props.label}
			<button>
				<i
					className="far fa-trash-alt"
					onClick={() => {
						props.delete(props.id);
					}}></i>
			</button>
		</li>
	);
};

Task.propTypes = {
	label: PropTypes.string,
	delete: PropTypes.func,
	id: PropTypes.string
};
export default Task;
