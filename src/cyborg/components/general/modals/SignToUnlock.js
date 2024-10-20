import React from 'react'
import Modal from './Modal'
import { MdOutlineLockPerson } from "react-icons/md";
import Button from '../buttons/Button';
import dockdeploy from '../../../../../public/assets/icons/dockdeploy.gif'

function SigntoUnlockModal({text, onClick, loading}) {
  return (
    //Modal doesn't have an outside click function, user has to wait until container is deployed
    <Modal alignment={undefined}>
      <div className="flex flex-col text-center items-center justify-center gap-6 max-w-1/3 rounded-lg">
        <div className='text-cb-green h-40'>
          {loading
            ? <img className='h-full aspect-square' src={dockdeploy} />
            : <MdOutlineLockPerson size={'100%'}/>
          }
        </div>
        <p className='text-lg'>{text}</p>
        <Button variation='primary' onClick={onClick}>
          Sign to Unlock 
        </Button>
      </div>
    </Modal>
  )
}

export default SigntoUnlockModal
