import { Avatar, TextField } from "@mui/material";
import { useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { PostButton } from "./buttons";
import { red } from "@mui/material/colors";
import styled from "@emotion/styled";
import L from "leaflet";

// マーカーアイコンのカスタム設定
const customRedIcon = new L.Icon({
    iconUrl: '/arrowmarker.svg',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [90, 50],
    iconAnchor: [45, 41],
    popupAnchor: [1, -34],
    shadowAnchor: [10, 40],
    shadowSize: [41, 41],
});


const CreatePinComponent = ({ position, state }: { position: any, state: (value: [number, number] | null) => void }) => {

    const [postText, onchangePostText] = useState("");
    const [titleText, onChangeTitleText] = useState('')

    return (
        <>
            <Marker position={position} icon={customRedIcon}>
                <StyledPopup
                    autoClose={false}
                    closeOnClick={false}
                >
                    <div style={{ width: 300 }}>
                        <TextField
                            label="場所の名前は？"
                            value={titleText}
                            fullWidth
                            onChange={(e) => onChangeTitleText(e.target.value)}
                            focused
                            sx={{
                                padding: 0,
                                height: "20px",
                                marginTop: 1,
                                marginBottom: "20px",
                                '& input': {
                                    padding: 1,
                                    height: '30px',
                                    boxSizing: 'border-box',
                                    display: 'flex',
                                    fontSize: 14,
                                },
                                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#a7a7a7", // フォーカス時のボーダー色
                                        },
                                        "& .MuiInputLabel-root.Mui-focused": {
                                            color: "#000000", // ラベルの色
                                            fontSize:15,
                                        },
                            }}
                        />
                        <div style={{ padding: 0, display: 'flex', alignItems: 'center', width: '100%' }}>
                            <Avatar sx={{ bgcolor: red[500], width: 30, height: 30, marginRight: '6px' }} aria-label="recipe">
                                R
                            </Avatar>
                            <div style={{ padding: 0, display: 'flex', alignItems: 'center', marginTop: '2px' }}>
                                <TextField
                                    label="ここはどんな場所？"
                                    value={postText}
                                    fullWidth
                                    onChange={(e) => onchangePostText(e.target.value)}
                                    focused
                                    sx={{
                                        color: "#ffffff",
                                        width: '210px',
                                        height: '36px',
                                        fontFamily: "system-ui",
                                        padding: 0,
                                        fontWeight: "bold",
                                        marginRight: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        '& input': {
                                            height: '100%',
                                            padding: 1,
                                            lineHeight: '36px',
                                            boxSizing: 'border-box',
                                            display: 'flex',
                                        },
                                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#0c0c0c", // フォーカス時のボーダー色
                                        },
                                        "& .MuiInputLabel-root.Mui-focused": {
                                            color: "#1a1008", // ラベルの色
                                        },
                                    }}
                                />
                                <PostButton title={titleText} content={postText} position={position} state={state} />
                            </div>
                        </div>
                    </div>

                </StyledPopup>
            </Marker>
        </>

    )
}

const StyledPopup = styled(Popup)`
  .leaflet-popup-content{
    margin:0; 
    display:flex;
    width:300px;
    padding-left:10px;
    padding-right:18px;

  }


  .leaflet-popup-content-wrapper {
    padding: 0; 
    margin: 0;
    height: 90px;
    display:flex;
    justify-content:center;
  }
`;

export default CreatePinComponent;