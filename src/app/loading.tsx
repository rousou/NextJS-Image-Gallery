import { Spinner } from "@/components/bootstrap";

export default function Loading(){
    return(
        <div>
            <Spinner animation="border" className="d-block m-auto"/>  
            <h5 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>Loading...</h5>
        </div>
    );
}