'use client'
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {useState, useEffect } from 'react';

export function GetWeaknesses(url: string){


	// const [weaknessDataJson, setData2] = useState(null)
	// const [isLoaded, setLoads] = useState(true)

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try{
	// 			const weaknessDataJson = await fetch(url);
	// 			const weaknessData = await weaknessDataJson.json();

	// 			setData2(weaknessData)
	// 			isLoaded(false);
	// 		} catch (error) {
	// 			console.log('Error fetching data:', error)
	// 		}
	// 	};

	// 	fetchData();
	// }, [url]);

	// if (isLoaded) return (<p>Loading...</p>)
	// if (!weaknessDataJson) return (<p>no profile data</p>)

	// const weaknessData = await fetch(url)
	// const weaknessDataJson = await weaknessData.json()

}

export function CreateTitle(){
  return(
    <h1 className="my-4 scroll-m-20 text-lg font-extrabold tracking-tight">Pok&eacute;mon Browser</h1>
  )
}

export function CreateHeaderBox(imgUrl, text){
  return(
	<div >
	<div className="absolute z-10 w-screen flex flex-col items-center justify-center my-20">
		<img className=" size-32 border-4 p-4 bg-gray-200 border-gray-100 rounded-full my-5" src={imgUrl}/>
		<h3 className="-bottom-0 font-extrabold">{text}</h3>
	</div>
    <div className="z-1 box-border h-40 max-w-full bg-gray-500"></div>
	<div className="z-1 box-border h-40 max-w-full"></div>
	</div>
  )

}

export function CreatePokemonDescription(){
  return(
    <div className="flex flex-row items-center justify-center my-5">
      <div className="my-5 w-3/4 bg-gray-200 shadow box-border h-20 flex flex-row items-center rounded-md ">
        <img className="size-20 border-4 p-4 bg-white rounded-full" src="https://archives.bulbagarden.net/media/upload/f/f6/Dream_Cherish_Ball_Sprite.png"/>
        <h2 className="inline-block w-7/8">For some time after its birth,</h2>
      </div>
    </div>

  )
}

export function CreateReturnButton(pageHomeFunc){
	return (
		<Button onClick={() => {pageHomeFunc(); }}>Home</Button>
	);
}

export function CreatePokemonStats(pageHomeFunc, render : bool, idNum = 1){

	// const id : number = parseInt(idNum);
	
	const gender  : string = "Male/Female"; //couldn't locate this in restapi
	const categories : string = "N/A"; //couldn't locate this in restapi

	const [posts, setData] = useState(null)
	const [isLoading, setLoading] = useState(true)

	const [descriptionData, setData1] = useState(null)
	const [isLoad, setLoad] = useState(true)

	const [weaknessDataJson, setData2] = useState(null)
	const [isLoaded, setLoads] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try{
				const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idNum.toString()}`);
				const data = await response.json();
				const retrieve = await fetch(data.abilities[0].ability.url);
				const description = await retrieve.json();
				const weaknessDataJson = await fetch(data.types[0].type.url);
				const weaknessData = await weaknessDataJson.json();

				// TODO: loop over type to access all weaknesses

				setData(data)
				setLoading(false);
				setData1(description)
				setLoad(false);
				setData2(weaknessData)
				setLoads(false);
			} catch (error) {
				console.log('Error fetching data:', error)
			}
		};

		fetchData();
	}, [idNum]);
	// Dirty hack to get around the above state distruction, 
	// if I have time relocate states above and pass data into function
	if(!render) {return (<div></div>)} 
	if (isLoading || isLoad || isLoaded) return (<p>Loading...</p>)
	if (!posts || !descriptionData || !weaknessDataJson) return (<p>no profile data</p>)

	// const id : number = idNum;
	const id : number = posts.id;
	let idString :string = id.toString();
	if (id >= 1 && id < 10){
		idString = `#000${idString}`;
	} else if (id >= 10 && id < 100){
		idString = `#00${idString}`;
	} else if (id >= 100 && id < 1000){
		idString = `#0${idString}`;
	} else {
		idString = `#${idString}`;
	}

		// return(
		// 	<div>
		// 	{ weaknessDataJson &&
		// 		weaknessDataJson.damage_relations.double_damage_from.map((xyz, i) => (
		// 			<Button className = "m-1" key={i}>{xyz.name}</Button>
		// 		))
		// 	}
		// 	</div>
		// )

	// const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id.toString()}`)
	// const posts = await data.json()

	// const description = await fetch(posts.abilities[0].ability.url)
	// const descriptionData = await description.json()
// ________________________________________________________________________________________________________
	const imgUrl :string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id.toString()}.png`;

	return(
		<div>
      {CreateTitle()}
      {CreateHeaderBox(imgUrl, `${posts.name} ${idString}`)}

      {CreatePokemonDescription()}

{/* -------------------------------Container 1-------------------------------------------- */}
				<div className="flex flex-row items-center justify-center my-5">
					<div className="grid grid-cols-5 grid-rows-5 gap-4 w-3/4">
    					<div className="row-span-5 rounded-md border-4 border-gray-100  p-10">
							<div className="flex flex-row items-center  my-4">
								<h3 className= "font-extrabold">Height</h3>
							</div>
								<div className="flex flex-row items-center">
									<p>{posts.height/10}</p>
									<p>m</p>
								</div>
							<div className="flex flex-row items-center  my-4">
								<h3 className= "font-extrabold">categories</h3>
							</div>
								<div className="flex flex-row items-center">
									<p>{categories}</p>
								</div>
							<div className="flex flex-row items-center  my-4">
								<h3 className= "font-extrabold">Weight</h3>
							</div>
								<div className="flex flex-row items-center ">
									<p>{posts.weight/10}</p>
									<p> kg</p>
								</div>
							<div className="flex flex-row items-center my-4">
								<h3 className= "font-extrabold">Gender</h3>
							</div>
								<div className="flex flex-row items-center">
									<p>{gender}</p>
								</div>
						</div>
{/* --------------------------------------------------------------------------- */}

{/* ---------------------------Container 2------------------------------------------------ */}
						<div className="col-span-2 row-span-2 col-start-2 row-start-1 rounded-md border-4 border-gray-100 p-10">
							<div className="flex flex-row items-center my-4">
								<h3 className= "font-extrabold">Type</h3>
							</div>
								<div className="flex flex-row items-center my-4r">
									{ posts &&
										posts.types.map((item, i) => (
											<Button className = "m-1" key={i}>{item.type.name}</Button>
										))
									}
                				</div>


							<div className="flex flex-row items-center my-4">
								<h3 className= "font-extrabold">Weakness</h3>
							</div>
								<div className="flex flex-row items-center my-4">
									{/* {posts.types.map((item, i) => (
										GetWeaknesses(item.type.url)
									))} */}
									<div>
										{ weaknessDataJson &&
		 									weaknessDataJson.damage_relations.double_damage_from.map((xyz, i) => (
		 									<Button className = "m-1" key={i}>{xyz.name}</Button>
		 									))
		 								}
		 							</div>
								</div>
						  </div>
{/* --------------------------------------------------------------------------- */}

{/* ----------------------------------Container3----------------------------------------- */}
    					<div className="col-span-2 row-span-2 col-start-4 row-start-1 rounded-md border-4 border-gray-100 p-10">
							<div className="flex flex-row items-center my-4">
								<h3 className= "font-extrabold">Abilities</h3>
							</div>
							<div className="flex flex-row items-center my-4">
								<p>{posts.abilities[0].ability.name}</p>
							</div>
							<div className="flex flex-row items-center my-4">
								{descriptionData &&
										descriptionData.flavor_text_entries[45].flavor_text}
							</div>
						</div>
{/* --------------------------------------------------------------------------- */}

{/* -------------------------------Container 4-------------------------------------------- */}
    					<div className="col-span-4 row-span-3 col-start-2 row-start-3 rounded-md border-4 border-gray-100 p-10">
							<div className="flex flex-row justify-between items-center my-4">
								<h3 className= "font-extrabold">HP</h3>
								<div className="w-3/4">
									<Progress value={posts.stats[0].base_stat} />
								</div>
							</div>

							<div className="flex flex-row justify-between items-center my-4">
								<h3 className= "font-extrabold">Attack</h3>
								<div className="w-3/4">
									<Progress value={posts.stats[1].base_stat} />
								</div>
							</div>

							<div className="flex flex-row justify-between items-center my-4">
								<h3 className= "font-extrabold">Defense</h3>
								<div className="w-3/4">
									<Progress value={posts.stats[2].base_stat} />
								</div>
							</div>


							<div className="flex flex-row justify-between items-center my-4">
								<h3 className= "font-extrabold">Special Attack</h3>
								<div className="w-3/4">
									<Progress value={posts.stats[3].base_stat} />
								</div>
							</div>


							<div className="flex flex-row justify-between items-center my-4">
								<h3 className= "font-extrabold ">Special Defense</h3>
								<div className="w-3/4">
									<Progress value={posts.stats[4].base_stat} />
								</div>
							</div>

							<div className="flex flex-row justify-between items-center my-4">
								<h3 className= "font-extrabold">Speed</h3>
								<div className="w-3/4">
									<Progress value={posts.stats[5].base_stat} />
								</div>
							</div>

						</div>
					</div>
				</div>
{/* --------------------------------------------------------------------------- */}
    	{/* {CreateReturnButton(pageHomeFunc)} */}
		</div>
	);
}