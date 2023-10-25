
import { Button, Space } from 'antd';
import {
  useParams
} from "react-router-dom";

function ThirdPage() {

  let { id } = useParams();

  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  )
}

export default ThirdPage


