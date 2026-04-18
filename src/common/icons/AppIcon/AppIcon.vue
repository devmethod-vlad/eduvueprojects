<template>

        <template v-if="props.name === 'warning'">
            <warning-icon
              :size="props.size"
              :color="props.color"
            />
        </template>

        <template v-else-if="props.name === 'close'">
            <close-icon
                :size="props.size"
                :color="props.color"
                :hover-color="props.hoverColor"
            />
        </template>

        <template v-else-if="props.name === 'chevron-up'">
            <chevron-up
              :size="props.size"
              :color="props.color"
            />
        </template>

        <template v-else-if="props.name === 'chevron-down'">
            <chevron-down
              :size="props.size"
              :color="props.color"
              :hover-color="props.hoverColor"
            />
        </template>

        <template v-else-if="props.name === 'in-work'">
            <in-work
              :size="props.size"
              :color="props.color"
            />
        </template>

        <template v-else-if="props.name === 'from-work'">
            <from-work
              :size="props.size"
              :color="props.color"
            />
        </template>

        <template v-else-if="props.name === 'to-archive'">
            <to-archive
              :size="props.size"
              :color="props.color"
            />
        </template>

        <template v-else-if="props.name === 'to-trash'">
            <to-trash
              :size="props.size"
              :color="props.color"
            />
        </template>

        <template v-else-if="props.name === 'from-trash'">
            <from-trash
              :size="props.size"
              :color="props.color"
            />
        </template>

        <template v-else-if="props.name === 'back-in-work'">
            <back-in-work
              :size="props.size"
              :color="props.color"
            />
        </template>

        <template v-else-if="props.name === 'public'">
            <public-icon
              :size="props.size"
              :color="props.color"
            />
        </template>

        <template v-else-if="props.name === 'from-public'">
            <from-public
              :size="props.size"
              :color="props.color"
            />
        </template>

        <template v-else-if="props.name === 'arrow-down'">
            <arrow-down
              :size="props.size"
              :color="props.color"
            />
        </template>

        <template v-else-if="props.name === 'arrow-up'">
          <arrow-up
              :size="props.size"
              :color="props.color"
          />
        </template>

        <template v-else-if="props.name === 'exit'">
            <exit-icon
              :size="props.size"
              :color="props.color"
            />
        </template>

        <template v-else-if="props.name === 'profile'">
            <profile-icon
              :size="props.size"
              :color="props.color"
            />
        </template>

        <template v-else-if="props.name === 'clip'">
            <clip-icon
              :size="props.size"
              :color="props.color"
            />
        </template>

        <template v-else-if="props.name === 'plus-circle'">
            <plus-circle
                     :size="props.size"
                     :color="props.color"
            />
        </template>

        <template v-else-if="props.name === 'warning-fill'">
            <warning-fill
                     :size="props.size"
                     :color="props.color"
            />
        </template>

        <template v-else-if="props.name === 'download'">
            <download-icon
                     :size="props.size"
                     :color="props.color"
                     :hover-color="props.hoverColor"
                     :press-color="props.pressColor"
            />
        </template>

        <template v-else-if="props.name === 'info-icon'">
            <info-icon
                     :size="props.size"
                     :color="props.color"
            />
        </template>

         <template v-else-if="props.name === 'eyes-on'">
             <eyes-on
                 :size="props.size"
                 :color="props.color"
                 :hover-color="props.hoverColor"
             />
         </template>

         <template v-else-if="props.name === 'eyes-off'">
             <eyes-off
                 :size="props.size"
                 :color="props.color"
                 :hover-color="props.hoverColor"
             />
         </template>

         <template v-else-if="props.name === 'chevron-left'">
           <chevron-left
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'chevron-right'">
           <chevron-rigth
               :size="props.size"
               :color="props.color"
               :hover-color="props.hoverColor"
           />
         </template>

         <template v-else-if="props.name === 'chevron-right-circle'">
           <chevron-rigth-circle
               :size="props.size"
               :color="props.color"
               :hover-color="props.hoverColor"
           />
         </template>

         <template v-else-if="props.name === 'plus-square'">
           <plus-square
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'create-dashboard'">
           <create-dashboard
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'lock-alt'">
           <lock-alt
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'lock-open-alt'">
           <lock-open-alt
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'info-circle'">
           <info-circle
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'info-fill'">
           <info-icon-fill
               :size="props.size"
               :color="props.color"
               :hover-color="props.hoverColor"
           />
         </template>

         <template v-else-if="props.name === 'trash-alt'">
           <trash-alt
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'cog-icon'">
           <cog-icon
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'clock-icon'">
           <clock-icon
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'exclamation-circle'">
           <exclamation-circle
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'setting'">
           <setting-icon
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'search'">
           <search-icon
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'times-circle'">
           <times-circle
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'check-square'">
           <check-square
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'file-check-alt'">
           <file-check-alt
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'file-block-alt'">
           <file-block-alt
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'times-square'">
           <times-square
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'filter'">
           <filter-icon
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'filter-slash'">
           <filter-slash
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'sorting'">
           <sorting-icon
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'sort-amount-down'">
           <sort-amount-down
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'sort-amount-up'">
           <sort-amount-up
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'download-alt'">
           <download-alt
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'file-download-alt'">
           <file-download-alt
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'user-plus'">
           <user-plus
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'sort'">
           <sort-icon
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'user'">
           <user-icon
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'okta'">
           <okta-icon
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'arrow-circle-right'">
           <arrow-circle-right
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'apps'">
           <apps-icon
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'save'">
           <save-icon
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'multiply'">
           <multiply-icon
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'clipboard-notes'">
           <clipboard-notes
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'chart-pie-alt'">
           <chart-pie-alt
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'users-alt'">
           <users-alt
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'edit-alt'">
           <edit-alt
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'heart-rate'">
           <heart-rate
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'sliders-v'">
           <sliders-v
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'chart-pie'">
           <chart-pie
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'check-circle'">
           <check-circle
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'ban'">
           <ban-icon
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'sorting-decrease'">
           <sorting-decrease
               :size="props.size"
               :color="props.color"
               :hover-color="props.hoverColor"
           />
         </template>

         <template v-else-if="props.name === 'sorting-increase'">
           <sorting-increase
               :size="props.size"
               :color="props.color"
               :hover-color="props.hoverColor"
           />
         </template>

         <template v-else-if="props.name === 'plus'">
           <plus-icon
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'group'">
           <group-icon
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'filter-up'">
           <filter-up
               :size="props.size"
               :color="props.color"
               :hover-color="props.hoverColor"
           />
         </template>

         <template v-else-if="props.name === 'filter-down'">
           <filter-down
               :size="props.size"
               :color="props.color"
               :hover-color="props.hoverColor"
           />
         </template>

         <template v-else-if="props.name === 'download-check'">
           <download-check
               :size="props.size"
               :color="props.color"
               :hover-color="props.hoverColor"
           />
         </template>

         <template v-else-if="props.name === 'pencil'">
           <pencil-icon
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'mark'">
           <mark-icon
               :size="props.size"
               :color="props.color"
           />
         </template>

         <template v-else-if="props.name === 'calendar'">
           <calendar-icon
               :size="props.size"
               :color="props.color"
               :hover-color="props.hoverColor"
           />
         </template>

         <template v-else-if="props.name === 'check-circle-big'">
           <check-circle-big
               :size="props.size"
               :color="props.color"
               :hover-color="props.hoverColor"
           />
         </template>

         <template v-else-if="props.name === 'copy'">
           <copy-icon
               :size="props.size"
               :color="props.color"
               :hover-color="props.hoverColor"
           />
         </template>

         <template v-else-if="props.name === 'close-circle'">
           <close-circle
               :size="props.size"
               :color="props.color"
               :hover-color="props.hoverColor"
               :press-color="props.pressColor"
           />
         </template>

         <template v-else-if="props.name === 'check-fill'">
           <check-fill
               :size="props.size"
               :color="props.color"
               :hover-color="props.hoverColor"
               :press-color="props.pressColor"
           />
         </template>

         <template v-else-if="props.name === 'close-fill'">
           <close-fill
               :size="props.size"
               :color="props.color"
               :hover-color="props.hoverColor"
               :press-color="props.pressColor"
           />
         </template>

         <template v-else-if="props.name === 'search-fill'">
           <search-fill
               :size="props.size"
               :color="props.color"
               :hover-color="props.hoverColor"
               :press-color="props.pressColor"
           />
         </template>

</template>

<script setup>
import SearchFill from "@/common/icons/AppIcon/icons/SearchFill.vue";
import CloseFill from "@/common/icons/AppIcon/icons/CloseFill.vue";
import CheckFill from "@/common/icons/AppIcon/icons/CheckFill.vue";
import ChevronRigthCircle from "@/common/icons/AppIcon/icons/ChevronRigthCircle.vue";
import InfoIconFill from "@/common/icons/AppIcon/icons/InfoIconFill.vue";
import ChevronRigth from "@/common/icons/AppIcon/icons/ChevronRigth.vue";
import CloseCircle from "@/common/icons/AppIcon/icons/CloseCircle.vue";
import CopyIcon from "@/common/icons/AppIcon/icons/CopyIcon.vue";
import CheckCircleBig from "@/common/icons/AppIcon/icons/CheckCircleBig.vue";
import CalendarIcon from "@/common/icons/AppIcon/icons/CalendarIcon.vue";
import MarkIcon from "@/common/icons/AppIcon/icons/MarkIcon.vue";
import PencilIcon from "@/common/icons/AppIcon/icons/PencilIcon.vue";
import DownloadCheck from "@/common/icons/AppIcon/icons/DownloadCheck.vue";
import FilterUp from "@/common/icons/AppIcon/icons/FilterUp.vue";
import FilterDown from "@/common/icons/AppIcon/icons/FilterDown.vue";
import GroupIcon from "@/common/icons/AppIcon/icons/GroupIcon.vue";
import PlusIcon from "@/common/icons/AppIcon/icons/PlusIcon.vue";
import SortingIncrease from "@/common/icons/AppIcon/icons/SortingIncrease.vue";
import SortingDecrease from "@/common/icons/AppIcon/icons/SortingDecrease.vue";
import BanIcon from "@/common/icons/AppIcon/icons/BanIcon.vue";
import CheckCircle from "@/common/icons/AppIcon/icons/CheckCircle.vue";
import ChartPie from "./icons/ChartPie.vue";
import SlidersV from "./icons/SlidersV.vue";
import HeartRate from "./icons/HeartRate.vue";
import EditAlt from "./icons/EditAlt.vue";
import UsersAlt from "./icons/UsersAlt.vue";
import ChartPieAlt from "./icons/ChartPieAlt.vue";
import ClipboardNotes from "./icons/ClipboardNotes.vue";
import MultiplyIcon from "./icons/MultiplyIcon.vue";
import SaveIcon from "./icons/SaveIcon.vue";
import AppsIcon from "./icons/AppsIcon.vue";
import ArrowCircleRight from "./icons/ArrowCircleRight.vue";
import OktaIcon from "./icons/OktaIcon.vue";
import UserIcon from "./icons/UserIcon.vue";
import SortIcon from "./icons/SortIcon.vue";
import UserPlus from "./icons/UserPlus.vue";
import FileDownloadAlt from "./icons/FileDownloadAlt.vue";
import DownloadAlt from "./icons/DownloadAlt.vue";
import SortAmountUp from "./icons/SortAmountUp.vue";
import SortAmountDown from "./icons/SortAmountDown.vue";
import SortingIcon from "./icons/SortingIcon.vue";
import FilterSlash from "./icons/FilterSlash.vue";
import FilterIcon from "./icons/FilterIcon.vue";
import TimesSquare from "./icons/TimesSquare.vue";
import FileBlockAlt from "./icons/FileBlockAlt.vue";
import FileCheckAlt from "./icons/FileCheckAlt.vue";
import CheckSquare from "./icons/CheckSquare.vue";
import TimesCircle from "./icons/TimesCircle.vue";
import SearchIcon from "./icons/SearchIcon.vue";
import SettingIcon from "./icons/SettingIcon.vue";
import ExclamationCircle from "./icons/ExclamationCircle.vue";
import ClockIcon from "./icons/ClockIcon.vue";
import CogIcon from "./icons/CogIcon.vue";
import TrashAlt from "./icons/TrashAlt.vue";
import InfoCircle from "./icons/InfoCircle.vue";
import LockOpenAlt from "./icons/LockOpenAlt.vue";
import LockAlt from "./icons/LockAlt.vue";
import CreateDashboard from "./icons/CreateDashboard.vue";
import PlusSquare from "./icons/PlusSquare.vue";
import ArrowUp from "./icons/ArrowUp.vue";
import ChevronLeft from "./icons/ChevronLeft.vue";
import DownloadIcon from "./icons/DownloadIcon.vue";
import WarningFill from "./icons/WarningFill.vue";
import PlusCircle from "./icons/PlusCircle.vue";
import ClipIcon from "./icons/ClipIcon.vue";
import ExitIcon from "./icons/ExitIcon.vue";
import ArrowDown from "./icons/ArrowDown.vue";
import FromPublic from "./icons/FromPublic.vue";
import PublicIcon from "./icons/PublicIcon.vue";
import BackInWork from "./icons/BackInWork.vue";
import FromTrash from "./icons/FromTrash.vue";
import ToTrash from "./icons/ToTrash.vue";
import ToArchive from "./icons/ToArchive.vue";
import FromWork from "./icons/FromWork.vue";
import InWork from "./icons/InWork.vue";
import CloseIcon from "./icons/CloseIcon.vue";
import WarningIcon from "./icons/WarningIcon.vue";
import ChevronUp from "./icons/ChevronUp.vue";
import ChevronDown from "./icons/ChevronDown.vue";
import ProfileIcon from "./icons/ProfileIcon.vue";
import InfoIcon from "./icons/InfoIcon.vue";
import EyesOn from "./icons/EyesOn.vue";
import EyesOff from "./icons/EyesOff.vue";

// PROPS
const props = defineProps({
    name:
        {
            type: String,
            default: '',
						required: true
        },
		size:
				{
						type: Number,
						default: 48
				},
    color:
        {
            type: String,
            default: '#333333'
        },
    hoverColor:
      {
        type: String,
        default: ''
      },
  pressColor:
      {
        type: String,
        default: ''
      },
});
</script>

<style scoped>

</style>