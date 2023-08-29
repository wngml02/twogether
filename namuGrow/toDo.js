const items = document.querySelector('.items');
        const itemPlus = document.querySelector('.item--add--icon');
        itemPlus.addEventListener('click', e => {
            let thisElement = e.target;
            if(thisElement.nodeName !== 'I'){
                thisElement = e.target.firstElementChild;
            }
            if (thisElement.classList.contains('fa-plus-circle')) {
                const itemElement = document.createElement('li');
                itemElement.classList.add('item');
                const checkTag = document.createElement('input');
                checkTag.setAttribute('type','checkbox');
                checkTag.classList.add('item--check');
                const textTag = document.createElement('input');
                textTag.setAttribute('type','text');
                textTag.classList.add('item--title');
                const spanTag = document.createElement('span');
                spanTag.classList.add('item--delete');
                spanTag.innerHTML = `<i class="fas fa-trash-alt"></i>`;

                itemElement.append(checkTag,textTag,spanTag);
                items.append(itemElement);
                thisElement.classList.remove('fa-plus-circle');
                thisElement.classList.add('fa-check');

                textTag.focus();
            } else if (thisElement.classList.contains('fa-check')) {
                const itemTitles = document.querySelectorAll('.item--title');
                const itemTitle = itemTitles[itemTitles.length-1];
                if(itemTitle.value === null || itemTitle.value === '') {
                    const items = document.querySelectorAll('.item');
                    items[items.length-1].remove();
                }
                itemTitle.setAttribute('disabled', true);
                itemTitle.style.border = 'none';
                itemTitle.style.backgroundColor = 'transparent';
                thisElement.classList.remove('fa-check');
                thisElement.classList.add('fa-plus-circle');
            }
        });
        const deleteBtns = document.querySelectorAll('.fa-trash-alt');
        items.addEventListener('click',e=>{
            if(e.target.classList.contains('fa-trash-alt')){
                const checkboxs = document.querySelectorAll('.item--check:checked');
                if(checkboxs.length > 0)
                    checkboxs.forEach(item => item.parentElement.remove());
                else
                    e.target.parentElement.parentElement.remove();
            }
        });
        window.addEventListener('keydown',e=>{
            if(e.keyCode !== 13) {
                e.stopPropagation();
                return;
            }
            itemPlus.click();
        })