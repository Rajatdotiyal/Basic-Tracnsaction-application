


export default function InputBox({label, placeholder,onChange}){
    return <>
    <div>
          <div className=" block mb-2 text-sm font-medium text-left text-gray-900">{label}</div>
          <div>
            <input onChange={onChange} type="text" className="mb-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder={placeholder}/>
          </div>
        </div>
    </>
}