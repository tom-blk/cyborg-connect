import React, { useState, useEffect } from 'react'
import nondeployed from '../../../../public/assets/icons/nondeployed.png' 
import deploymentsTab from '../../../../public/assets/icons/deployment-logo.png' 
import cyberdock from '../../../../public/assets/icons/cyberdockDash.png' 
import { FiPlusCircle } from "react-icons/fi";
import { useSubstrateState } from '../../../substrate-lib';
import { DASH_STATE, useCyborg, useCyborgState } from '../../CyborgContext';
import { Button } from 'semantic-ui-react';
import { TbRefresh } from "react-icons/tb";
// import { GetLogs } from './ComputeProviderStatus';
function AddNodeButton({addNode}) {
    return (
        <button onClick={()=>addNode(true)}
            className='flex items-center gap-1 size-30 text-white py-3 px-6 rounded-md bg-cb-green focus:bg-cb-gray-400'>
            <FiPlusCircle size={18} /> Add Node</button>
    )
}
function NoNodes({addNode}) {
    return (
        <div className='flex flex-col justify-center h-2/3 items-center'>
            <a className=''>
                <img src={nondeployed} />
            </a>
            <div className='text-white flex flex-col'>
                <p>Currently, you don't have any nodes.</p>
                <button onClick={()=>addNode(true)} className='hover:text-cb-green'><u>Add your first node</u></button>
            </div>
        </div>
    )
}

function NodeList({nodes}) {
    const { toggleDashboard } = useCyborg()
    return (
        <div className='flex flex-col w-full text-white text-opacity-70 '>
            {/* <span className='flex w-5/6 py-2 px-5'>
                <ul className='grid grid-cols-3 w-full'>
                    <li>Name</li>
                    <li>Type</li>
                    <li>Location</li>
                </ul>
            </span>
            <div className='bg-white bg-opacity-10 m-4 rounded-lg'>
                <span className='flex justify-between w-5/6 items-center py-4 px-5'>
                    <ul className='grid grid-cols-3 w-full items-center'>
                        <li className='flex items-center gap-3'>
                            <a>
                                <img src={cyberdock} />
                            </a>
                            <button className='flex flex-col items-start hover:text-cb-green'
                                            onClick={()=>toggleDashboard({ section: DASH_STATE.SERVER, metadata: { ip: { ipv4: ['0','0','0','0']}, port: '0' } })}>
                                <h3 className='mb-0'>Cyber Dock</h3>
                                <p className='mt-0 text-lg'>Zigbee</p>
                            </button>
                        </li>
                        <li>Master</li>
                        <li>Austin, Texas</li>
                    </ul>
                </span>
            </div> */}
            <span className={`${nodes.length < 1? 'hidden' : ''} flex w-full py-2 px-5`}>
                <ul className='grid grid-cols-4 w-full'>
                    <li>Name / Address</li>
                    <li>Type</li>
                    <li>URL / IP</li>
                    <li>Status</li>
                </ul>
            </span>
                <div className='bg-white bg-opacity-10 m-4 rounded-lg'>
                    {nodes.length > 0 && nodes.map((item, key) => (
                        <div key={key}>
                            <span className='flex justify-between w-full items-center py-4 px-5'>
                                <ul className='grid grid-cols-4 w-full items-center'>
                                    <li className='flex items-center gap-3]'>
                                        <a>
                                            <img src={cyberdock} />
                                        </a>
                                        <button className='pl-3 flex flex-col items-start hover:text-cb-green'
                                            onClick={()=>toggleDashboard({ section: DASH_STATE.SERVER, metadata: item })}>
                                            {/* <h3 className='mb-0'>ID:{item.id}</h3> */}
                                            <p className='mt-0 text-sm'>ID:{item.owner.slice(0,16)}:{item.id}</p>
                                        </button>
                                    </li>
                                    <li>Providers</li>
                                    <li>{`${item.api.domain}`}</li>
                                    {/* <li className={`${item.status ?'text-cb-green': 'text-red-600'}`}>{item.status?'verified': 'unverified'}</li> */}
                                </ul>
                            </span>
                            {/* <div className='p-1 flex w-full'>
                                <GetLogs link={`${item.ip.ipv4.join('.')}:${item.port.replace(",", "")}`} loading/>
                            </div> */}
                        </div>
                    ))}
                </div>
        </div>
    )
}

function Dashboard() {
    const [node, addNode]=useState(false)
    const { api } = useSubstrateState()
    const [refresh, setRefresh] = useState(false)
    const { listWorkers } = useCyborg()
    const { workerList } = useCyborgState()
    console.log("workerList: ", workerList)

    useEffect(() => {
      const getRegisteredWorkers = async () => {
          const entries = await api.query.edgeConnect.workerClusters.entries();
          // Extract and process the worker clusters
          const workerClusters = entries.map(([key, value]) => {
            return value.toHuman()
          });
          console.log("WORKERS RETREIVED:: ", workerClusters, entries)
          listWorkers(workerClusters)
      }
        getRegisteredWorkers()
    },[refresh])
  return (
    <div className='h-screen bg-cb-gray-700 flex flex-col '>
        <div className='flex items-center justify-between mx-2 text-white'>
            <div className='flex items-center'>
                <img src={deploymentsTab} />
                <div>
                    <h3 className='mb-0'>Deployments</h3>
                    <p className='text-white text-opacity-70'>Dashboard / Node List</p>
                </div>
            </div>
            <div className='flex gap-2'>
                <Button onClick={()=>setRefresh(!refresh)}><TbRefresh /></Button>
                <AddNodeButton addNode={addNode} />
            </div>
        </div>
        {   node || (workerList && workerList.length > 0)?
            <NodeList nodes={workerList} /> :
            <NoNodes addNode={addNode} />
        }
    </div>
  )
}

export default Dashboard