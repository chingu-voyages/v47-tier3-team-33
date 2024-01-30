import SearchBar from "../components/SearchBar"

const EventsPage= () => {
    return (
        <div className=" justify-center h-screen m-8">
            <div className="flex justify-center pt-32 text-black text-4xl ">
                Explore Events
            </div>
            <div className= "flex items-center pt-20 ">
            <SearchBar onSearch={function (query: string): void {
                throw new Error("Function not implemented.");
            } }/>
           </div>
        </div>

    )
}
export default EventsPage;