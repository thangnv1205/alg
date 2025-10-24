# Algorithms Collection Makefile
# Supports compilation for multiple programming languages

# Compiler settings
CC = gcc
CXX = g++
JAVAC = javac
PYTHON = python3
NODE = node
AS = nasm
ASM_FLAGS = -f elf64

# Additional language compilers
CSC = csc                   # C# compiler
DART = dart                 # Dart runtime
ELIXIR = elixir             # Elixir runtime
ERL = erl                   # Erlang runtime
GO = go                     # Go compiler
KOTLIN = kotlinc            # Kotlin compiler
PHP = php                   # PHP runtime
RACKET = racket             # Racket runtime
RUBY = ruby                 # Ruby runtime
RUST = rustc                # Rust compiler
SCALA = scalac              # Scala compiler
SWIFT = swift               # Swift compiler
TSC = tsc                   # TypeScript compiler

# Directories
SRC_DIR = .
BUILD_DIR = build
BIN_DIR = bin

# Create directories
$(BUILD_DIR):
	mkdir -p $(BUILD_DIR)

$(BIN_DIR):
	mkdir -p $(BIN_DIR)

# C compilation
%.o: %.c
	$(CC) -c $< -o $@

# C++ compilation  
%.o: %.cpp
	$(CXX) -c $< -o $@

# Java compilation
%.class: %.java
	$(JAVAC) -d $(BUILD_DIR) $<

# Assembly compilation
%.o: %.asm
	$(AS) $(ASM_FLAGS) $< -o $@

# C# compilation
%.exe: %.cs
	$(CSC) $< -out:$@

# Go compilation
%.exe: %.go
	$(GO) build -o $@ $<

# Kotlin compilation
%.jar: %.kt
	$(KOTLIN) -include-runtime -d $@ $<

# Rust compilation
%.exe: %.rs
	$(RUST) $< -o $@

# Scala compilation
%.class: %.scala
	$(SCALA) -d $(BUILD_DIR) $<

# Swift compilation
%.exe: %.swift
	$(SWIFT) $< -o $@

# TypeScript compilation
%.js: %.ts
	$(TSC) $< --outFile $@

# Compile all C files
compile-c: $(BUILD_DIR)
	@echo "Compiling C files..."
	@find . -name "*.c" -exec $(CC) -o $(BUILD_DIR)/{} {} \;

# Compile all C++ files
compile-cpp: $(BUILD_DIR)
	@echo "Compiling C++ files..."
	@find . -name "*.cpp" -exec $(CXX) -o $(BUILD_DIR)/{} {} \;

# Compile all Java files
compile-java: $(BUILD_DIR)
	@echo "Compiling Java files..."
	@find . -name "*.java" -exec $(JAVAC) -d $(BUILD_DIR) {} \;

# Compile all TypeScript files
compile-ts:
	@echo "Compiling TypeScript files..."
	@find . -name "*.ts" -exec tsc {} \;

# Compile all Assembly files
compile-asm: $(BUILD_DIR)
	@echo "Compiling Assembly files..."
	@find . -name "*.asm" -exec $(AS) $(ASM_FLAGS) {} -o $(BUILD_DIR)/{}.o \;

# Compile all C# files
compile-csharp: $(BUILD_DIR)
	@echo "Compiling C# files..."
	@find . -name "*.cs" -exec $(CSC) {} -out:$(BUILD_DIR)/{}.exe \;

# Compile all Go files
compile-go: $(BUILD_DIR)
	@echo "Compiling Go files..."
	@find . -name "*.go" -exec $(GO) build -o $(BUILD_DIR)/{} {} \;

# Compile all Kotlin files
compile-kotlin: $(BUILD_DIR)
	@echo "Compiling Kotlin files..."
	@find . -name "*.kt" -exec $(KOTLIN) -include-runtime -d $(BUILD_DIR)/{}.jar {} \;

# Compile all Rust files
compile-rust: $(BUILD_DIR)
	@echo "Compiling Rust files..."
	@find . -name "*.rs" -exec $(RUST) {} -o $(BUILD_DIR)/{} \;

# Compile all Scala files
compile-scala: $(BUILD_DIR)
	@echo "Compiling Scala files..."
	@find . -name "*.scala" -exec $(SCALA) -d $(BUILD_DIR) {} \;

# Compile all Swift files
compile-swift: $(BUILD_DIR)
	@echo "Compiling Swift files..."
	@find . -name "*.swift" -exec $(SWIFT) {} -o $(BUILD_DIR)/{} \;

# Run JavaScript files
run-js:
	@echo "Running JavaScript files..."
	@find . -name "*.js" -exec $(NODE) {} \;

# Run Python files
run-python:
	@echo "Running Python files..."
	@find . -name "*.py" -exec $(PYTHON) {} \;

# Run Java files
run-java: compile-java
	@echo "Running Java files..."
	@find $(BUILD_DIR) -name "*.class" -exec java -cp $(BUILD_DIR) {} \;

# Run C programs
run-c: compile-c
	@echo "Running C programs..."
	@find $(BUILD_DIR) -name "*.c" -exec {} \;

# Run C++ programs
run-cpp: compile-cpp
	@echo "Running C++ programs..."
	@find $(BUILD_DIR) -name "*.cpp" -exec {} \;

# Run Assembly programs
run-asm: compile-asm
	@echo "Running Assembly programs..."
	@find $(BUILD_DIR) -name "*.o" -exec $(CC) {} -o $(BUILD_DIR)/asm_program \;
	@$(BUILD_DIR)/asm_program

# Run C# programs
run-csharp: compile-csharp
	@echo "Running C# programs..."
	@find $(BUILD_DIR) -name "*.exe" -exec {} \;

# Run Dart programs
run-dart:
	@echo "Running Dart programs..."
	@find . -name "*.dart" -exec $(DART) {} \;

# Run Elixir programs
run-elixir:
	@echo "Running Elixir programs..."
	@find . -name "*.ex" -exec $(ELIXIR) {} \;

# Run Erlang programs
run-erlang:
	@echo "Running Erlang programs..."
	@find . -name "*.erl" -exec $(ERL) -noshell -eval "c:l({}), halt()." {} \;

# Run Go programs
run-go: compile-go
	@echo "Running Go programs..."
	@find $(BUILD_DIR) -name "*.go" -exec {} \;

# Run Kotlin programs
run-kotlin: compile-kotlin
	@echo "Running Kotlin programs..."
	@find $(BUILD_DIR) -name "*.jar" -exec java -jar {} \;

# Run PHP programs
run-php:
	@echo "Running PHP programs..."
	@find . -name "*.php" -exec $(PHP) {} \;

# Run Racket programs
run-racket:
	@echo "Running Racket programs..."
	@find . -name "*.rkt" -exec $(RACKET) {} \;

# Run Ruby programs
run-ruby:
	@echo "Running Ruby programs..."
	@find . -name "*.rb" -exec $(RUBY) {} \;

# Run Rust programs
run-rust: compile-rust
	@echo "Running Rust programs..."
	@find $(BUILD_DIR) -name "*.rs" -exec {} \;

# Run Scala programs
run-scala: compile-scala
	@echo "Running Scala programs..."
	@find $(BUILD_DIR) -name "*.class" -exec scala -cp $(BUILD_DIR) {} \;

# Run Swift programs
run-swift: compile-swift
	@echo "Running Swift programs..."
	@find $(BUILD_DIR) -name "*.swift" -exec {} \;

# Clean build files
clean:
	@echo "Cleaning build files..."
	@rm -rf $(BUILD_DIR)
	@rm -rf $(BIN_DIR)
	@find . -name "*.class" -delete
	@find . -name "*.o" -delete
	@find . -name "*.exe" -delete

# Install dependencies
install:
	@echo "Installing dependencies..."
	npm install

# Run all algorithms
run-all: run-js run-python run-java run-c run-cpp run-asm run-csharp run-dart run-elixir run-erlang run-go run-kotlin run-php run-racket run-ruby run-rust run-scala run-swift

# Compile all languages
compile-all: compile-c compile-cpp compile-java compile-ts compile-asm compile-csharp compile-go compile-kotlin compile-rust compile-scala compile-swift

# Test all algorithms
test:
	@echo "Running tests..."
	npm test

# Benchmark all algorithms
benchmark:
	@echo "Running benchmarks..."
	npm run benchmark

# Setup environment
setup: install
	@echo "Setting up environment..."
	@mkdir -p $(BUILD_DIR)
	@mkdir -p $(BIN_DIR)

# Help
help:
	@echo "Available targets:"
	@echo "  compile-c      - Compile all C files"
	@echo "  compile-cpp    - Compile all C++ files"
	@echo "  compile-java   - Compile all Java files"
	@echo "  compile-ts     - Compile all TypeScript files"
	@echo "  compile-asm    - Compile all Assembly files"
	@echo "  compile-csharp - Compile all C# files"
	@echo "  compile-go     - Compile all Go files"
	@echo "  compile-kotlin  - Compile all Kotlin files"
	@echo "  compile-rust   - Compile all Rust files"
	@echo "  compile-scala  - Compile all Scala files"
	@echo "  compile-swift  - Compile all Swift files"
	@echo "  compile-all    - Compile all supported languages"
	@echo "  run-js         - Run all JavaScript files"
	@echo "  run-python     - Run all Python files"
	@echo "  run-java       - Compile and run all Java files"
	@echo "  run-c          - Compile and run all C files"
	@echo "  run-cpp        - Compile and run all C++ files"
	@echo "  run-asm        - Compile and run all Assembly files"
	@echo "  run-csharp     - Compile and run all C# files"
	@echo "  run-dart       - Run all Dart files"
	@echo "  run-elixir     - Run all Elixir files"
	@echo "  run-erlang     - Run all Erlang files"
	@echo "  run-go         - Compile and run all Go files"
	@echo "  run-kotlin     - Compile and run all Kotlin files"
	@echo "  run-php        - Run all PHP files"
	@echo "  run-racket     - Run all Racket files"
	@echo "  run-ruby       - Run all Ruby files"
	@echo "  run-rust       - Compile and run all Rust files"
	@echo "  run-scala      - Compile and run all Scala files"
	@echo "  run-swift      - Compile and run all Swift files"
	@echo "  run-all        - Run all algorithms"
	@echo "  test           - Run tests"
	@echo "  benchmark      - Run benchmarks"
	@echo "  clean          - Clean build files"
	@echo "  install        - Install dependencies"
	@echo "  setup          - Setup environment"
	@echo "  help           - Show this help"

.PHONY: all clean install setup test benchmark help
