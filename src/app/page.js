import FeaturedRecipes from "@/Components/HomePage/FeaturedRecipes";
import PopularRecipes from "@/Components/HomePage/PopularRecipes";
import Banner from "@/Components/Shared/Banner";
import { exitingRecipes} from "@/lib/api_actions/recipe_api";

export default async function Home()  {
  const  dataOfHome = await exitingRecipes()
  console.log(dataOfHome, ' data for home pagae ')
  const {popularRecipes, featuredRecipes} = dataOfHome;

  return (
    <div>
       <Banner></Banner>
        <FeaturedRecipes featuredRecipes={featuredRecipes}></FeaturedRecipes>
        <PopularRecipes popularRecipes={popularRecipes} ></PopularRecipes>
    </div>
  );
}
