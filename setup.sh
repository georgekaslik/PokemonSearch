echo "#########################" 
echo "Creating Pokemon project"
echo "#########################" 
echo "!!! MUST ANSWER YES TO TAILWIND !!!"
npx create-next-app@latest pokemon
cd pokemon

echo "#########################" 
echo "Installing Shadcn/UI"
echo "#########################" 
npm install shadcn

echo "#########################" 
echo "Configure Shadcn/UI"
echo "#########################" 
npx shadcn@latest init

echo "#########################" 
echo "Starting Server"
echo "#########################" 
npm run dev
