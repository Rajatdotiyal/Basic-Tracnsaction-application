export default function Button({label, onClick}){
    return<>
    <div>
    <button onClick={onClick} type="button" className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 w-full me-2 mt-2 mb-2 ">{label}</button>
    </div>
    </>
}