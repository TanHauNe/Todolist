const HandleChange = (props) => {
    const { status, list, handleChangeStatus, handleDelete } = props;
    let finalList = [];
    if (status === "all") {
        finalList = list;
    } else if (status === "completed") {
        finalList = list.filter((li) => li.status === "completed");
    } else {
        finalList = list.filter((li) => li.status !== "completed");
    }
    return finalList.map((li) => (
        <div className="data wrapper">
            <li className="name-text" key={li.id}>{li.name}</li>
            <div className="button-main">
                {li.status === "completed" ? (
                    <button
                        className="btn-xanh"
                        onClick={() => {
                            handleChangeStatus(li.id);
                        }}
                    >
                        Check
                    </button>
                ) : (
                    <button
                        className="btn-xam"
                        onClick={() => {
                            handleChangeStatus(li.id);
                        }}
                    >
                        Check
                    </button>
                )}

                <button
                    className="delete-btn"
                    onClick={() => {
                        handleDelete(li.id);
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    ));
};

export default HandleChange;
