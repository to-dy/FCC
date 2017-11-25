function makeRequest() {

    if (validate()) {

        document.getElementById('list').innerHTML = '<h5 class="mt-0 mb-1" style="text-align: center; padding : 120px;">Loading...</h5>';

        var searchText = encodeURI(document.getElementById('searchText').value);

        var url = 'https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrprop=snippet&format=json&origin=*&formatversion=2&prop=pageimages|extracts|info&inprop=url&gsrlimit=15&exintro=true&explaintext=true&exsentences=1&exlimit=max&piprop=thumbnail&pithumbsize=200&gsrsearch=' +
            searchText;

        resize();

        getJSON(url, function (status, data) {

            document.getElementById('list').innerHTML = "";

            if (status != null) {

                if (data.query != null) {

                    var result = data.query.pages;

                    result.forEach(function (result) {

                        var sdata =
                            '<li class="media">' +
                            '<div class="media-body">' +
                            '<a href="' + result.fullurl + '">' +
                            '<h5 class="mt-0 mb-1">' + result.title + '</h5>' +
                            '</a>' +
                            result.extract +
                            '</div>';

                        if ('thumbnail' in result) {

                            sdata += '<img class="d-flex mr-3" src="' + result.thumbnail["source"] + '">' +
                                '</li>';

                        } else {

                            sdata += '</li>';

                        }

                        document.getElementById('list').innerHTML += sdata;

                    });

                } else {

                    document.getElementById('list').innerHTML += '<h5 class="mt-0 mb-1" style="text-align: center; font-size: 26px; padding: 40px; "> :( No search result for <span style="color: orange; text-decoration: underline;">' + searchText.trim() + '</span></h5>';
                }

            } else {

                document.getElementById('list').innerHTML = '<h5 class="mt-0 mb-1" style="text-align: center; padding : 120px;">Error fetching results.. Try again</h5>';
            }
        });

    } else {

        document.getElementById('list').innerHTML = '<h5 class="mt-0 mb-1" style="text-align: center; padding : 120px;">Search field cannot be empty :/</h5>';

    }

}






function getJSON(url, callback) {

    var xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.responseType = 'json';

    xhr.onload = function () {

        var status = xhr.status;

        if (status === 200) {

            callback(status, xhr.response);

        } else {

            callback(status, xhr.response);

        }
    };

    xhr.onerror = function () {

        document.getElementById('list').innerHTML = '<h5 class="mt-0 mb-1" style="text-align: center; padding : 120px;">Error fetching results.. Try again</h5>';

    };

    xhr.send();

};

function validate() {

    if (document.getElementById('searchText').value.trim() === '') {

        return false;

    } else {

        return true;

    }
}

function keypress(e) {

    if (e.keyCode === 13) {

        e.preventDefault();

        makeRequest();

    }

}

function resize() {

    var header = document.getElementById('header');
    var logo = document.getElementById('logo');
    var search = document.getElementById('search');

    header.className = "container-fluid header-small";

    logo.className = "logo-small";

    search.className = "input-group search-small";

}