/**
 * Created by Jaime on 29/01/2017.
 */
suite('"About" Page Tests', function(){
    test('page should contain link to contact page', function(){
        assert($('a[href="/contact"]').length);
    });
});