import { fetcher } from "@/lib/swr/fetcher";
import { ProductType } from "@/types/product.type";
import DetailProduct from "@/views/DetailProduct";
import { useRouter } from "next/router";
import useSWR from "swr";
const DetailProductPage = ({product} : {product: ProductType}) => {
    const {query} = useRouter();
    // client side
    // const { data, isLoading } = useSWR(`/api/product/${query.product}`, fetcher);

    return (
        <div>
            {/* client side */}
            {/* <DetailProduct product={isLoading ? [] : data.data}/> */}
            {/* server side */}
            <DetailProduct product={product}/>
        </div>
    );
};

export default DetailProductPage;

export async function getServerSideProps({params} : {params: {product : string}}) {
    // fetch data
    const res = await fetch(`http://localhost:3000/api/product/${params.product}`);
    const response = await res.json();
  
    return {
      props: {
        product: response.data,
      },
    };
  }