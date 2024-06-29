

export default function FriendName({fname}){

    return<>
        <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-2xl text-white">{fname[0].toUpperCase()}</span>
            </div>
            <h3 className="text-2xl font-semibold">{fname}</h3>
        </div>
    </>
}