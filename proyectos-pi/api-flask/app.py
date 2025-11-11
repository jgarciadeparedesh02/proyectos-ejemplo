from flask import Flask, jsonify, request

app = Flask(__name__)

# In-memory data store for books
books = [
    {'id': 1, 'title': '1984', 'author': 'George Orwell', 'published_year': 1949},
    {'id': 2, 'title': 'To Kill a Mockingbird', 'author': 'Harper Lee', 'published_year': 1960},
    {'id': 3, 'title': 'The Great Gatsby', 'author': 'F. Scott Fitzgerald', 'published_year': 1925}
]

@app.route('/books', methods=['GET', 'POST'])
def handle_books():
    if request.method == 'GET':
        """Returns the complete list of books."""
        return jsonify(books)
    
    elif request.method == 'POST':
        """Adds a new book to the list."""
        new_book = request.get_json()
        
        # A simple validation
        if not new_book or 'title' not in new_book:
            return jsonify({'error': 'The book title is required'}), 400
        
        # Assign a simple ID
        new_book['id'] = len(books) + 1
        books.append(new_book)
        return jsonify(new_book), 201

if __name__ == '__main__':
    app.run(debug=True)
