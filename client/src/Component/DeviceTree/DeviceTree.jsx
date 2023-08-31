import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { TreeNode } from "../../Utils/Tree";
import Loading from "../Loading/Loading";
import Tree from "../Tree/Tree";


import "./DeviceTree.css"

const DeviceList = () => {

    const [Devices, setDevices] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [isCreatedStack, setIsCreatedStack] = useState(false)
    const [Stack, setStack] = useState([])


    function setTree() {
        let RootNode = new TreeNode({
            "pingID": 0,
            "name": "Devices",
            "cihazTuru": "Root",
            "ip": "100.1",
            "enlem": "",
            "boylam": "",
            "rootID": -1
        }, null);
        let index = 0;
        let temp;
        let stack = [RootNode];
        let Node;
        while (index < Devices.length) {

            if (Devices[index].rootID == 0) {
                Node = new TreeNode(Devices[index], RootNode)
                stack.push(Node)
                RootNode.children.push(Node);
                temp = Devices[index];
                Devices[index] = Devices[Devices.length - 1];
                Devices[Devices.length - 1] = temp;
                Devices.pop()

            }
            index++;

        }
        index = 0;
        let j = 0;
        let isFind = false;
        while (index < stack.length) {
            while (j < Devices.length) {

                if (stack[index].pingID == Devices[j].rootID) {
                    Node = new TreeNode(Devices[j], stack[index])
                    stack.push(Node)
                    stack[index].children.push(Node)
                    temp = Devices[j];
                    Devices[j] = Devices[Devices.length - 1];
                    Devices[Devices.length - 1] = temp;
                    Devices.pop()
                    isFind = true;
                    break;
                }

                j++;
            }
            j = 0;
            if (isFind) {
                index = 0
                isFind = false
            } else {

                index++
            }



        }

        setStack(stack)
        setIsCreatedStack(true)
        console.log(Stack[0])
    }

    async function fetchApi() {
        try {

            const response = await axios.get("/DeviceList");
            const data = response.data;
            const newDevices = [];
            let i = 0;
            while (i < data.length) {
                newDevices.push({
                    name: data[i].cihazAdi,
                    type: data[i].cihazTuru,
                    latLng: [data[i].enlem, data[i].boylam],
                    rootID: data[i].rootID,
                    pingID: data[i].pingID
                });
                i += 1
            }
            setDevices(newDevices);

            setIsFetched(true)
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }


    useEffect(() => {

        fetchApi()
        if (isFetched) {
            setTree()
        }

    }, [isFetched]);




    return (
        <div className="DeviceList">

            {
                isFetched && isCreatedStack ?
                    <Tree  root={Stack[0]}  key={Stack[0].ip}/>
                    //<div></div>
                    : <Loading />
            }


        </div >
    )

}


export default DeviceList