import {
  ButtonPrimaryBig,
  ButtonOutlinBig,
  ButtonOutlineSmall,
  ButtonPrimarySmall,
} from "@/components/atoms/Button";
import FullScreenLoading from "@/components/atoms/FullScreenLoading";
import SkeletonLoading from "@/components/atoms/SkeletonLoading";
import { Headline, HelperText } from "@/components/atoms/Text";
import ProductPage from "@/components/templates/ProductPage";
import { useLoading } from "@/context/FullScreenLoaderContext";
import axios from "axios";
import { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function HomeTab() {
  const setLoading = useLoading();

  const setsome =()=>{
    setLoading(true);
     setTimeout(() => {
       setLoading(false);
     }, 2000);
  }

  // useEffect(() => {
  //   setLoading(true);

  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);
  // // const fetchProducts = async () => {
  //   console.log('hit this')
  //   try {

  //     const response = await axios.get(`http://localhost:9000/store/products`, {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "x-publishable-api-key":
  //           "pk_538a0b9c964e74ff9e0ca79f8f72afab30a84a9f27e3e4a9da5fb7c6cafe112d",
  //       },
  //     });
  //     console.log(response);
  //   } catch (error) {

  //     if (axios.isAxiosError(error)) {
  //       console.error("Axios error:", error.message);
  //     } else {
  //       console.error("Unexpected error:", error);
  //     }
  //     return []; // Return empty array in case of error
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <ProductPage />
      <HelperText text={"hello"} />
      <SkeletonLoading />
      {/* <FullScreenLoading/> */}
      <TouchableOpacity onPress={setsome}>
      <Text>loading</Text>
      </TouchableOpacity>
      <Text>Welcome to the Home Tab!</Text>
    </View>
  );
}
