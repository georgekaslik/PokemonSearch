"use client";
import "./globals.css";
import { Button } from "@/components/ui/button" //npx shadcn@latest add button
import { Input } from "@/components/ui/input" //npx shadcn@latest add input
import { useState } from "react";
import {CreateCard, CreatePokemonStats, getPokemonData } from "./stats";

export function CreateMainHeader(){
	return (
	<div className="flex flex-col items-center justify-center border-b border-solid border-gray-400">
		<h1 className="my-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Pok&eacute;mon Browser</h1> 
		<h4 className="text-gray-500">Search and find Pok&eacute;mon</h4>
	</div> // &eacute; this allows the ponousation over the "e" 
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
					<Button type="submit" >Search</Button>
				</div>
			</div>
		</div>
	)
}

export function get12PokemonData(startId){
	const pokemon = []; // array to store the pokemon that has been generated
	let hasData = true;
	for(let i = startId; i <= (startId + 12); i++) // for loop to collect the 12 pokemon
	{
		const data = getPokemonData(i) // link to the function that gets the data from pokeApi 
		if(data[0]) //hasData
		{
			pokemon.push( data );
		}
		else{
			hasData = hasData & false; //set hasData to false if waiting for any data
		}
	}
	return [hasData, pokemon];
}

export function CreateCardGrid(hasData :boolean, pokemon, statButton1 : Function){ //TODO: STEP-2 loop over pokemon and create the cards dynamically
	if(!hasData){return (<h1 className = 'flex flex-row items-center justify-center'>LOADING ...</h1>)} // LOADING message before the screen is generated

	return(
		<div> 
			<div className="grid grid-cols-6 grid-rows-3 gap-y-5"> 
				<div className="col-start-2 row-start-1 col-span-4 flex items-center justify-between flex-wrap">
					<Button  onClick={ () => statButton1(0)} className='flex-1 w-fit h-fit bg-transparent p-0 rounded-2xl m-5'>
						<CreateCard pokemonJson={pokemon[0]}/> 
					</Button> 
					<Button  onClick={ () => statButton1(1)} className='flex-1 w-fit h-fit bg-transparent p-0 rounded-2xl m-5'>
						<CreateCard pokemonJson={pokemon[1]}/>
					</Button>
					<Button  onClick={ () => statButton1(2)} className='flex-1 w-fit h-fit bg-transparent p-0 rounded-2xl m-5'>
						<CreateCard pokemonJson={pokemon[2]}/>
					</Button>
					<Button  onClick={ () => statButton1(3)} className='flex-1 w-fit h-fit bg-transparent p-0 rounded-2xl m-5'>
						<CreateCard pokemonJson={pokemon[3]}/>
					</Button>
				</div> 

				<div className="col-start-2 row-start-2 col-span-4 flex items-center justify-between flex-wrap ">
				  <Button  onClick={ () => statButton1(4)} className='flex-1 w-fit h-fit bg-transparent p-0 rounded-2xl m-5'>
					<CreateCard pokemonJson={pokemon[4]} />
				  </Button>
				  <Button  onClick={ () => statButton1(5)} className='flex-1 w-fit h-fit bg-transparent p-0 rounded-2xl m-5'>
					<CreateCard pokemonJson={pokemon[5]} />
				  </Button>
				  <Button  onClick={ () => statButton1(6)} className='flex-1 w-fit h-fit bg-transparent p-0 rounded-2xl m-5'>
					<CreateCard pokemonJson={pokemon[6]} />
				  </Button>
				  <Button  onClick={ () => statButton1(7)} className='flex-1 w-fit h-fit bg-transparent p-0 rounded-2xl m-5'>
					<CreateCard pokemonJson={pokemon[7]} />
				  </Button>
				</div>

				<div className="col-start-2 row-start-3 col-span-4 flex items-center justify-between flex-wrap">
					<Button  onClick={ () => statButton1(8)} className='flex-1 w-fit h-fit bg-transparent p-0 rounded-2xl m-5'>
					<CreateCard pokemonJson={pokemon[8]} />
				  </Button>
				  <Button  onClick={ () => statButton1(9)} className='flex-1 w-fit h-fit bg-transparent p-0 rounded-2xl m-5'>
					<CreateCard pokemonJson={pokemon[9]} />
				  </Button>
				  <Button  onClick={ () => statButton1(10)} className='flex-1 w-fit h-fit bg-transparent p-0 rounded-2xl m-5'>
					<CreateCard pokemonJson={pokemon[10]} />
				  </Button>
				  <Button  onClick={ () => statButton1(11)} className='flex-1 w-fit h-fit bg-transparent p-0 rounded-2xl m-5'>
					<CreateCard pokemonJson={pokemon[11]} />
				  </Button>
				</div>
			</div>
		</div> // this builds the home page which displays the pokemon as a card and lays a button behind it so you can select the pokemon
	)
}

export default function Home() {
	const [countClick, setCountClick] = useState(0);
	const pageInc = () => { setCountClick(countClick + 1);}; // next button to increase the counter for the page by 1
	const pageDec = () => { if (countClick > 0) {setCountClick(countClick - 1); } };  // back button to decrease the counter for the page by 1 and not exceed 0

	const [pageType, setPageType] = useState("HOME"); // this sets the starting page as the Home page
	const homeButton = () => {setPageType("HOME"); }; // this links the home button on stats page to take the user back to the home 
	const statButton = (index) => {setPageType("STATS-" + index)}; // this allows the user to access the stats and of the pokemon they selected

	
	
	const startNum :number = (countClick * 12) + 1; // generate the 12 cards per page +1 when its a next page so the next set of 12 pokemon will be shown
	
	const [hasData, pokemon] = get12PokemonData(startNum);
	let ifSearch = false;
	if(pageType == "HOME") // if home use these function and button to build the page
	{
		let backButton = (countClick == 0 || ifSearch) ? <Button className="m-1  bg-gray-500" onClick={pageDec}>&#8592; Back</Button> : <Button className="m-1" onClick={pageDec}>&#8592; Back</Button>;
		let forwardButton = (ifSearch) ? <Button className="m-1  bg-gray-500" onClick={pageInc}>Next &#8594;</Button> : <Button className="m-1" onClick={pageInc}>Next &#8594;</Button>;
		
	return (
		<div>
			{CreateMainHeader()}
			{CreateSearch()}
			{CreateCardGrid(hasData, pokemon, statButton)}
			<div className="flex flex-row items-center justify-center my-5">
			{backButton}
			{forwardButton}
			</div>
			{CreateMainFooter()}
		</div>
	);
	} // if stats use these functions and buttons to build the page
	else if(pageType.includes("STATS")) {
		let index = parseInt(pageType.split("-")[1], 10);
		return(
			<div>
			{ CreatePokemonStats(pokemon[index], true, index)}
			<div className="flex flex-row items-center justify-center my-5">
				<div className="grid grid-cols-5 grid-rows-5 gap-4 w-3/4">
				<div className="row-span-5 ">
					<Button onClick={homeButton}>Home</Button>
				</div>
				</div>
			</div>
			</div>
		)
	} 
	else {
		return (<h1>404 PAGE NOT FOUND</h1>); // if no page is built produce this error message
	}
}