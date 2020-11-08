import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

function NweetFactory({ userObj }) {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const onSubmit = async (event) => {
        if (nweet === "") {
            return;
        }
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmenRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmenRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const nweetObj = {
            text: nweet,
            createAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl: attachmentUrl
        };
        await dbService.collection("nweets").add(nweetObj);
        setNweet("");
        setAttachment(null);
    };
    const onChange = (event) => {
        const { target: { value } } = event;
        setNweet(value);
    };
    const onFileChange = (event) => {
        const { target: { files } } = event;
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (finishedEvent) => {
            const { currentTarget: { result } } = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(file);
    };
    const onClearAttachment = () => setAttachment("");
    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <div className="factoryInput__container">
                    <input
                        className="factoryInput__input"
                        value={nweet}
                        onChange={onChange}
                        type="text"
                        placeholder="What's on your mind?"
                        maxLength={120}
                    />
                    <input type="submit" value="&rarr;" className="factoryInput__arrow" />
                </div>
                <label for="attach-file" className="factoryInput__label">
                    <span>Add photos</span>
                    <FontAwesomeIcon icon={faPlus} />
                </label>
                <input
                    id="attach-file"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    style={{
                        opacity: 0,
                    }}
                />
                {attachment && (
                    <div className="factoryForm__attachment">
                        <img
                            src={attachment}
                            style={{
                                backgroundImage: attachment,
                            }}
                        />
                        <div className="factoryForm__clear" onClick={onClearAttachment}>
                            <span>Remove</span>
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                    </div>
                )}
            </div>
        </form>
    );
}

export default NweetFactory;