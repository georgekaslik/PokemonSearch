import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import React, {Suspense} from 'react';
import {useState, useEffect } from 'react'


export function CreateCard({idNum} : {idNum:number}){
    const id : number = idNum;
    let idString :string = idNum.toString();
    if (id >= 1 && id < 10){
      idString = `#000${idString}`;
    } else if (id >= 10 && id < 100){
      idString = `#00${idString}`;
    } else if (id >= 100 && id < 1000){
      idString = `#0${idString}`;
    } else {
      idString = `#${idString}`;
    }

    const [posts, setData] = useState(null)
    let [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try{
                console.log(id);
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id.toString()}`);
                const data = await response.json();
                setData(data)
                setLoading(false);
            } catch (error) {
                console.log('Error fetching data:', error)
            }
        };

        fetchData();
    }, [id]);

    if (isLoading) return (<p>Loading...</p>)
    if (!posts) return (<p>no profile data</p>)

    const imgUrl :string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id.toString()}.png`;

    return (
        <Suspense fallback = {<div>Loading...</div>}>
            {/* <Button onClick={ () => statButton(6)} className='flex-1 w-fit h-fit bg-transparent p-0 rounded-2xl m-5'> */}
                <Card className="w-full h-fit">
                    <CardHeader className="flex items-center justify-center">
                        <img src={imgUrl} alt="Bulbersor" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle>{posts.name}</CardTitle>
                        <CardDescription>{idString}</CardDescription>
                    </CardContent>
                    <CardFooter className="flex items-start justify-center">
                        { posts &&
                          posts.types.map((item, i) => (
                         <div className = "bg-slate-950 px-4 py-1 rounded-md text-white ml-1" key={i}>{item.type.name}</div>
                            ))
                        }
                    </CardFooter>
                </Card>
            {/* </Button> */}
        </Suspense>
    );
}