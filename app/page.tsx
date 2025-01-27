"use client";
import "./globals.css";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreateCard} from "./pageServer";


import { useState } from "react";
import { CreatePokemonStats } from "./stats";

export function CreateMainHeader(){
    return (
    <div className="flex flex-col items-center justify-center border-b border-solid border-gray-400">
        <h1 className="my-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Pok&eacute;mon Browser</h1>
        <h4 className="text-gray-500">Search and find Pok&eacute;mon</h4>
    </div>
    )
}

export function CreateMainFooter(){
    return (
        <div className="h-20 flex flex-col items-center justify-center border-t border-solid border-gray-400">
            <h4 className="text-gray-500">Thank you for using Pok&eacute;mon Browser!</h4>
        </div>
    )
}

export function CreateSearch(){
    return(
        <div className="grid grid-cols-6 grid-rows-1 gap-0 gap-y-0 my-5">
            <div className="col-start-2 row-start-1 col-span-4 flex items-center justify-between flex-wrap">
                <h3>Explore Pok&eacute;mon</h3>
                <div className="flex w-full max-w-sm items-center space-x-2 ">
                    <Input type="search" placeholder="Find Pok&eacute;mon" />
                    <Button type="submit">Search</Button>
                </div>
            </div>
        </div>
    )
}


export function CreateCardGrid(pageNum : number, statButton1 : Function){
    let startNum :number = (pageNum * 12) + 1;
    return(
        <div>
            <div className="grid grid-cols-6 grid-rows-3 gap-y-5">
                <div className="col-start-2 row-start-1 col-span-4 flex items-center justify-between flex-wrap">
                  <Button  onClick={ () => statButton1(startNum)} className='flex-1 w-fit h-fit bg-transparent p-0 rounded-2xl m-5'>
                    <CreateCard idNum={startNum}/>
                  </Button>
                  <Button  onClick={ () => statButton1(startNum + 1)} className='flex-1 w-fit h-fit bg-transparent p-0 rounded-2xl m-5'>
                    <CreateCard idNum={(startNum + 1)} />
                  </Button>
                  <Button  onClick={ () => statButton1(startNum + 2)} className='flex-1 w-fit h-fit bg-transparent p-0 rounded-2xl m-5'>
                    <CreateCard idNum={(startNum + 2)} />
                  </Button>
                  <Button  onClick={ () => statButton1(startNum + 3)} className='flex-1 w-fit h-fit bg-transparent p-0 rounded-2xl m-5'>
                    <CreateCard idNum={(startNum + 3)} />
                  </Button>
                </div>

                <div className="col-start-2 row-start-2 col-span-4 flex items-center justify-between flex-wrap ">
                  <Button  onClick={ () => statButton1(startNum + 4)} className='flex-1 w-fit h-fit bg-transparent p-0 rounded-2xl m-5'>
                    <CreateCard idNum={(startNum + 4) } />
                  </Button>
                  <Button  onClick={ () => statButton1(startNum + 5)} className='flex-1 w-fit h-fit bg-transparent p-0 rounded-2xl m-5'>
                    <CreateCard idNum={(startNum + 5) } />
                  </Button>
                  <Button  onClick={ () => statButton1(startNum + 6)} className='flex-1 w-fit h-fit bg-transparent p-0 rounded-2xl m-5'>
                    <CreateCard idNum={(startNum + 6) } />
                  </Button>
                  <Button  onClick={ () => statButton1(startNum + 7)} className='flex-1 w-fit h-fit bg-transparent p-0 rounded-2xl m-5'>
                    <CreateCard idNum={(startNum + 7) } />
                  </Button>
                </div>

                <div className="col-start-2 row-start-3 col-span-4 flex items-center justify-between flex-wrap">
                    <Button  onClick={ () => statButton1(startNum + 8)} className='flex-1 w-fit h-fit bg-transparent p-0 rounded-2xl m-5'>
                    <CreateCard idNum={(startNum + 8) } />
                  </Button>
                  <Button  onClick={ () => statButton1(startNum + 9)} className='flex-1 w-fit h-fit bg-transparent p-0 rounded-2xl m-5'>
                    <CreateCard idNum={(startNum + 9) } />
                  </Button>
                  <Button  onClick={ () => statButton1(startNum + 10)} className='flex-1 w-fit h-fit bg-transparent p-0 rounded-2xl m-5'>
                    <CreateCard idNum={(startNum + 10) } />
                  </Button>
                  <Button  onClick={ () => statButton1(startNum + 11)} className='flex-1 w-fit h-fit bg-transparent p-0 rounded-2xl m-5'>
                    <CreateCard idNum={(startNum + 11) } />
                  </Button>
                </div>
            </div>
        </div>
    )
}

export default function Home() {
  const [countClick, setCountClick] = useState(0);
  const [pageData, setPageData] = useState([]);
  const [pageType, setPageType] = useState("HOME");
  const homeButton = () => {setPageType("HOME"); };
  const statButton = (id) => {setPageType("STATS-" + id)};

  const pageInc = () => { setCountClick(countClick + 1); };
  const pageDec = () => { if (countClick > 0) {setCountClick(countClick - 1); } }; 

  console.log(pageType);
  if(pageType == "HOME")
  {
    return (
        <div>
            { CreatePokemonStats(homeButton, false)}
            {CreateMainHeader()}
            {CreateSearch()}
            {CreateCardGrid(countClick, statButton)}
            <div className="flex flex-row items-center justify-center my-5">
                <Button className="m-1" onClick={pageDec}>Back</Button>
                <Button className="m-1" onClick={pageInc}>Next</Button>
            </div>
            {CreateMainFooter()}
        </div>
    );
  } else if(pageType.includes("STATS")) {
    let id = parseInt(pageType.split("-")[1], 10);
    return(
      <div>
        { CreatePokemonStats(homeButton, true, id)}
        <div className="flex flex-row items-center justify-center my-5">
          <div className="grid grid-cols-5 grid-rows-5 gap-4 w-3/4">
            <div className="row-span-5 ">
              <Button onClick={homeButton}>Home</Button>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (<h1>404 PAGE NOT FOUND</h1>);
  }
}