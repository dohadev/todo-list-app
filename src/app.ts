interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

type Filter = "all" | "active" | "completed";

class TodoApp {
  private todos: Todo[] = [];
  private currentFilter: Filter = "all";

  // DOM Elements
  private form = document.getElementById("todo-form") as HTMLFormElement;
  private input = document.getElementById("todo-input") as HTMLInputElement;
  private list = document.getElementById("todo-list") as HTMLUListElement;
  private itemsLeft = document.getElementById("items-left") as HTMLSpanElement;
  private clearBtn = document.getElementById(
    "clear-completed",
  ) as HTMLButtonElement;
  private filterButtons = document.querySelectorAll(".filter-btn");

  constructor() {
    this.loadFromStorage();
    this.bindEvents();
    this.render();
  }

  private bindEvents(): void {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addTodo();
    });

    this.clearBtn.addEventListener("click", () => this.clearCompleted());

    this.filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = (btn as HTMLElement).dataset.filter as Filter;
        this.setFilter(filter);
      });
    });
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  private addTodo(): void {
    const text = this.input.value.trim();
    if (!text) return;

    const newTodo: Todo = {
      id: this.generateId(),
      text,
      completed: false,
      createdAt: Date.now(),
    };

    this.todos.unshift(newTodo);
    this.input.value = "";
    this.saveToStorage();
    this.render();
  }

  private toggleTodo(id: string): void {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveToStorage();
      this.render();
    }
  }

  private deleteTodo(id: string): void {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.saveToStorage();
    this.render();
  }

  private clearCompleted(): void {
    this.todos = this.todos.filter((t) => !t.completed);
    this.saveToStorage();
    this.render();
  }

  private setFilter(filter: Filter): void {
    this.currentFilter = filter;

    this.filterButtons.forEach((btn) => {
      btn.classList.toggle(
        "active",
        (btn as HTMLElement).dataset.filter === filter,
      );
    });

    this.render();
  }

  private getFilteredTodos(): Todo[] {
    switch (this.currentFilter) {
      case "active":
        return this.todos.filter((t) => !t.completed);
      case "completed":
        return this.todos.filter((t) => t.completed);
      default:
        return this.todos;
    }
  }

  private render(): void {
    const filtered = this.getFilteredTodos();

    if (filtered.length === 0) {
      this.list.innerHTML = `
        <li class="empty-state">
          ${this.currentFilter === "all" ? "No tasks yet. Add one above!" : `No ${this.currentFilter} tasks`}
        </li>
      `;
    } else {
      this.list.innerHTML = filtered
        .map(
          (todo) => `
          <li class="todo-item ${todo.completed ? "completed" : ""}" data-id="${todo.id}">
            <input
              type="checkbox"
              class="todo-checkbox"
              ${todo.completed ? "checked" : ""}
            />
            <span class="todo-text">${this.escapeHtml(todo.text)}</span>
            <button class="delete-btn" title="Delete">×</button>
          </li>
        `,
        )
        .join("");
    }

    // Bind events to new elements
    this.list.querySelectorAll(".todo-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        const id = (e.target as HTMLElement)
          .closest(".todo-item")
          ?.getAttribute("data-id");
        if (id) this.toggleTodo(id);
      });
    });

    this.list.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = (e.target as HTMLElement)
          .closest(".todo-item")
          ?.getAttribute("data-id");
        if (id) this.deleteTodo(id);
      });
    });

    // Update counter
    const activeCount = this.todos.filter((t) => !t.completed).length;
    this.itemsLeft.textContent = `${activeCount} item${activeCount !== 1 ? "s" : ""} left`;
  }

  private escapeHtml(text: string): string {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  private saveToStorage(): void {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  private loadFromStorage(): void {
    const data = localStorage.getItem("todos");
    if (data) {
      try {
        this.todos = JSON.parse(data);
      } catch {
        this.todos = [];
      }
    }
  }
}

// Start the app
document.addEventListener("DOMContentLoaded", () => {
  new TodoApp();
});
