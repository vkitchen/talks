my @fib = 1, 1;
sub get_fib($index where * > 0) {
    while (@fib.elems < $index + 1) {
        @fib.append: @fib[*-1] + @fib[*-2];
    }
    return @fib[$index];
}

say get_fib(-10);
