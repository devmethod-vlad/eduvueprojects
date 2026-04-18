
async function setSurveyOptions(survey){
    survey.locale = "ru";
    survey.onUpdateQuestionCssClasses.add(function(canCreateDiscussions, scope) {
        let css = scope.cssClasses;
        css.mainRoot += " sv_qstn";
        css.root = "sq-root";
        css.title += " sq-title";
        css.item += " sq-item";
        css.label += " sq-label";
        if (scope.question.isRequired) {
            css.title += " sq-title-required";
            css.root += " sq-root-required";
        }
        if ("checkbox" === scope.question.getType()) {
            css.root += " sq-root-cb";
        }
    });
    return survey;
}

export {setSurveyOptions}