const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const emptyState = document.getElementById('emptyState');
    const progress = document.getElementById('progress');
    const progressPercent = document.getElementById('progressPercent');

    function addTask() {
        const input = taskInput.value.trim();
        if (input === '') return;
      
        const parts = input.split('|').map(x => x.trim());
        const taskText = parts[0];
        const tag = parts.length > 1 ? parts[1] : '';
        const priorityRaw = parts.length > 2 ? parts[2] : '';
        const priority = priorityRaw.toLowerCase();
      
        let priorityClass = '';
        if (priority === 'high') priorityClass = 'high';
        else if (priority === 'medium') priorityClass = 'medium';
        else if (priority === 'low') priorityClass = 'low';
      
        const li = document.createElement('li');
        li.innerHTML = `
          <span onclick="toggleComplete(this)">
            ${taskText}
            ${tag ? `<span class='badge'>${tag}</span>` : ''}
            ${(priorityClass && priorityRaw) ? `<span class='badge priority ${priorityClass}'>${priorityRaw}</span>` : ''}
          </span>
          <button class="delete-btn" onclick="deleteTask(this)">❌</button>
        `;
        taskList.appendChild(li);
        taskInput.value = '';
        emptyState.style.display = 'none';
        updateProgress();
      }
      

    function deleteTask(button) {
      const li = button.parentElement;
      li.remove();
      if (taskList.children.length === 0) {
        emptyState.style.display = 'block';
      }
      updateProgress();
    }

    function toggleComplete(span) {
      const li = span.parentElement;
      li.classList.toggle('completed');
      updateProgress();
    }

    function updateProgress() {
      const total = taskList.children.length;
      const completed = document.querySelectorAll('li.completed').length;
      const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
      progress.style.width = percent + '%';
      progressPercent.textContent = percent + '%';
    }