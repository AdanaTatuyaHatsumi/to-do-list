// Modifikasi fungsi saveTask() untuk menyimpan status tugas (selesai/belum selesai) ke dalam Local Storage
function saveTask(task, completed = false) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ content: task, completed: completed });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Tambahkan fungsi untuk menandai tugas sebagai selesai di Local Storage
function markTaskAsCompleted(taskContent) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    var index = tasks.indexOf(taskContent);
    if (index !== -1) {
        tasks[index] = { content: taskContent, completed: true };
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

// Tambahkan fungsi untuk menandai tugas sebagai belum selesai di Local Storage
function markTaskAsIncomplete(taskContent) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    var index = tasks.findIndex(task => task.content === taskContent);
    if (index !== -1) {
        tasks[index].completed = false;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

// Modifikasi fungsi addTask() untuk menambahkan checkbox dan menyimpan status checkbox ke dalam Local Storage
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value === "") {
        alert("Please enter a task!");
        return;
    }

    var li = document.createElement("li");
    li.textContent = taskInput.value;

    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "task-checkbox";

    // Tambahkan event listener untuk checkbox
    checkBox.addEventListener("change", function() {
        var isChecked = this.checked;
        var taskContent = this.parentNode.textContent.trim(); // Dapatkan konten tugas terkait dengan checkbox
        var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        // Perbarui status checkbox di Local Storage
        var taskIndex = tasks.findIndex(task => task.content === taskContent);
        if (taskIndex !== -1) {
            tasks[taskIndex].completed = isChecked;
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
        
        // Tambahkan kelas CSS completed ke elemen li jika checkbox dicentang
        if (isChecked) {
            li.classList.add("completed");
        } else {
            li.classList.remove("completed");
        }
    });

    li.appendChild(checkBox);
    taskList.appendChild(li);

    // Simpan tugas ke Local Storage dengan status checkbox
    saveTask(taskInput.value, false); // false menunjukkan tugas belum selesai
    taskInput.value = "";
}
// Modifikasi fungsi loadTasks() untuk mengambil status checkbox dari Local Storage saat halaman dimuat
function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    var taskList = document.getElementById("taskList");

    tasks.forEach(function(task) {
        var li = document.createElement("li");
        li.textContent = task.content;

        
        var checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.className = "task-checkbox";
        checkBox.checked = task.completed; // Tetapkan status checkbox sesuai dengan status tugas di Local Storage

        // Tambahkan event listener untuk checkbox
        checkBox.addEventListener("change", function() {
            var isChecked = this.checked;
            var taskContent = this.parentNode.textContent.trim(); // Dapatkan konten tugas terkait dengan checkbox
            var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

            // Perbarui status checkbox di Local Storage
            var taskIndex = tasks.findIndex(task => task.content === taskContent);
            if (taskIndex !== -1) {
                tasks[taskIndex].completed = isChecked;
                localStorage.setItem("tasks", JSON.stringify(tasks));
            }

            // Tambahkan atau hapus kelas CSS completed dari elemen li sesuai dengan status checkbox
            if (isChecked) {
                li.classList.add("completed");
            } else {
                li.classList.remove("completed");
            }
        });

        li.appendChild(checkBox);
        taskList.appendChild(li);

        // Tambahkan tombol Hapus
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", function() {
            li.parentNode.removeChild(li); // Hapus elemen li saat tombol Hapus ditekan
            removeTask(task.content); // Hapus tugas dari Local Storage
        });


        // Tambahkan kelas CSS completed ke elemen li jika checkbox dicentang
        if (task.completed) {
            li.classList.add("completed");
        }
        
    });
}
// Tambahkan fungsi untuk membuat checkbox dan menandainya sesuai dengan status tugas
function createCheckbox(parentElement, checked) {
    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "task-checkbox";
    checkBox.checked = checked; // Set status checkbox sesuai dengan argumen 'checked'
    
    // Tambahkan event listener untuk checkbox
    checkBox.addEventListener("change", function() {
        var isChecked = this.checked;
        if (isChecked) {
            parentElement.classList.add("completed");
            // Tandai tugas sebagai selesai di Local Storage
            markTaskAsCompleted(parentElement.textContent);
        } else {
            parentElement.classList.remove("completed");
            // Tandai tugas sebagai belum selesai di Local Storage
            markTaskAsIncomplete(parentElement.textContent);
        }
    });

    parentElement.appendChild(checkBox);
}

// Panggil fungsi loadTasks() saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadTasks);

// Tambahkan fungsi untuk menghapus tugas dari Local Storage
function removeTask(taskContent) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    var index = tasks.findIndex(task => task.content === taskContent);
    if (index !== -1) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}
// Tambahkan fungsi untuk menghitung jumlah tugas yang belum selesai
function countIncompleteTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    var count = tasks.filter(task => !task.completed).length;
    return count;
}

// Tampilkan jumlah tugas yang belum selesai di dalam judul aplikasi
var incompleteTasksCount = countIncompleteTasks();
document.title = "To-Do List (" + incompleteTasksCount + " tasks remaining)";
