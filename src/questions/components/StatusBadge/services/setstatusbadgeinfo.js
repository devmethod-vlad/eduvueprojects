import {getQuestionStatus} from "@/questions/services/getquestionstatus";

function setStatusBadgeInfo(statusid){
    let result = {
        badgeText: '',
        badgeClass: ''
    }
    let status_array = getQuestionStatus(statusid) ;
    if (status_array !== null){
        let status = status_array[0];
        result.badgeText = status_array[1];

        if (status === 'create'){
            result.badgeClass = 'vue-badge-blue';
        }
        else if (status === 'inwork'){
            result.badgeClass = 'vue-badge-orange';
        }
        else if (status === 'received_answer'){
            result.badgeClass = 'vue-badge-green';
        }
        else if (status === 'archive'){
            result.badgeClass = 'vue-badge-gray';
        }
        else if (status === 'trash'){
            result.badgeClass = 'vue-badge-raspberry';
        }
        else if (status === 'back_in_work'){
            result.badgeClass = 'vue-badge-gray';
        }
    }
    return result;
}

export {setStatusBadgeInfo}