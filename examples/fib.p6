my @fib = 1, 1;
sub get_fib($index) {
    while (@fib.elems < $index + 1) {
        @fib.append: @fib[*-1] + @fib[*-2];
    }
    return @fib[$index];
}

say get_fib(20);
