import { Button } from "@mui/material";
import { db } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useAlert } from "../../context/AlertContext";
import { useSelector } from "react-redux";
import { reducerUser } from "../../redux/auth/authType";

// const PostButton = ({content,state}:{content:string,state:(value:boolean)=>void}) => {
export const PostButton = ({ title, content, position, state }: { title: string, content: string, position: any, state: (value: [number, number] | null) => void }) => {
    const { showAlert } = useAlert()
    const user = useSelector((state: reducerUser) => state.auth.user);

    const addData = async () => {
        try {
            if (user === null) return showAlert("認証エラー:サインインしなおしてください", 'error');
            if (content.length == 0 || title.length == 0) return
            await addDoc(collection(db, 'posts'), {
                user_id: user.id,
                title: title,
                content: content,
                lat: position[0],
                lng: position[1],
                timestamp: new Date,
            })
            showAlert('ポストしました', 'success');
            state(null);
        } catch (error) {
            if (error instanceof Error) {
                showAlert(error.message, 'error')
            }
        }
    }

    return (
        <Button
            variant='outlined'
            onClick={addData} size="small"
            sx={{
                padding: '2px 8px', 
                fontSize: '10px', 
                height: '24px', 
                minWidth: '50px', 
                textTransform: 'none',
            }}
        >
            ポスト
        </Button>
    )
}
