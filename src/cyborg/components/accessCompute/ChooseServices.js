import React from 'react'
import cyberdock from '../../../../public/assets/icons/cyberdock.png'
import comingsoon from '../../../../public/assets/icons/comingsoon.png'
import UploadDockerImgURL from './modals/UploadDockerImgURL.js'
import ServiceCard from './ServiceCard'
import {
  DEPLOY_STATUS,
  useCyborgState,
  useCyborg,
  SERVICES,
} from '../../CyborgContext'
import LoadDeployCyberDock from './modals/LoadDeployCyberDock'

function ChooseServices() {
  const { serviceStatus, service } = useCyborgState()
  const { selectService } = useCyborg()

  return (
    <div className="relative h-screen bg-cb-gray-700 flex flex-col items-center justify-center">
      <h1 className="text-white">Choose Services</h1>
      <div className="flex sm:flex-row flex-col gap-4 p-2">
        <ServiceCard
          logo={cyberdock}
          title="Cyber Dock"
          description="(deploy docker images at ease)"
          setService={selectService}
          service={SERVICES.CYBER_DOCK}
        />
        <ServiceCard logo={comingsoon} title="Coming Soon..." />
        <ServiceCard logo={comingsoon} title="Coming Soon..." />
      </div>
      <div className="flex sm:flex-row flex-col gap-4 p-3">
        <ServiceCard logo={comingsoon} title="Coming Soon..." />
        <ServiceCard logo={comingsoon} title="Coming Soon..." />
      </div>
      {service === SERVICES.CYBER_DOCK ? (
        <UploadDockerImgURL setService={selectService} />
      ) : (
        <></>
      )}
      {serviceStatus.deployTask === DEPLOY_STATUS.PENDING &&
      service === SERVICES.CYBER_DOCK ? (
        <LoadDeployCyberDock />
      ) : (
        <></>
      )}
    </div>
  )
}

export default ChooseServices
