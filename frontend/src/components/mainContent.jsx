import PropTypes from "prop-types";

export function MainContent({ children }) {
	return (
		<main
			style={{
				background: "#f1eefe",
				width: "100%",
			}}
		>
			<div
				style={{
					background: "#fff",
					borderRadius: "3rem 0",
					padding: "1rem",
					marginTop: "12px",
					height: "100%",
				}}
			>
				{children}
			</div>
		</main>
	);
}

MainContent.propTypes = {
	children: PropTypes.node, // children puede ser cualquier nodo React
};
