function EmbeddedPage(props) {
    return (
        <iframe
            style={{
                border: "none",
                display: "block",
                // transform: "scale(0.8)",
            }}
            src={props.url}
            width={props.width}
            height={props.height}
            title={props.title}
        />
    );
}

export default EmbeddedPage;