import DashboardController from './DashboardController'
import AgendaController from './AgendaController'
import CaptionController from './CaptionController'
import Settings from './Settings'
const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
AgendaController: Object.assign(AgendaController, AgendaController),
CaptionController: Object.assign(CaptionController, CaptionController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers