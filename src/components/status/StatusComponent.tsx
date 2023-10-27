interface StatusComponentProps {
    status: string;
}

function StatusComponent({ status }: StatusComponentProps) {
    return (
        status === "Pending" ? (
            <div className="w-32 justify-center items-center text-center rounded-2xl bg-yellow-500 border-2 border-orange-500">
                <p className="text-center">{status}</p>
            </div>
        ) : status === "Accepted" ? (
            <div className="w-32 justify-center items-center text-center rounded-2xl bg-green-600 border-2 border-green-900">
                <p className="text-center">{status}</p>
            </div>
        ) : status === "Rejected" ? (
            <div className="w-32 justify-center items-center text-center rounded-2xl bg-red-700 border-2 border-red-950">
                <p className="text-center">{status}</p>
            </div>
        ) : null
    );
}

export default StatusComponent;