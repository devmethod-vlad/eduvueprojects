
function resetSort(filter, exclude=''){

    if(exclude !=='fio' ){
        filter.fio_sort.active = 0;
        filter.fio_sort.type = 'asc';
    }

    if(exclude !=='login' ){
        filter.login_sort.active = 0;
        filter.login_sort.type = 'asc';
    }

    if(exclude !=='role' ){
        filter.role_sort.active = 0;
        filter.role_sort.type = 'asc';
    }

    if(exclude !=='spec' ){
        filter.spec_sort.active = 0;
        filter.spec_sort.type = 'asc';
    }

    if(exclude !=='mu' ){
        filter.mu_name_sort.active = 0;
        filter.mu_name_sort.type = 'asc';
    }

    filter.mu_shortname_sort.active = 0;
    filter.mu_shortname_sort.type = 'asc';

    if(exclude !=='mo' ){
        filter.mo_name_sort.active = 0;
        filter.mo_name_sort.type = 'asc';
    }

    filter.mo_shortname_sort.active = 0;
    filter.mo_shortname_sort.type = 'asc';
}

export {resetSort}